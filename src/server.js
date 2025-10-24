import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import AdminJS from 'adminjs';
import ConnectPgSimple from 'connect-pg-simple';
import { sequelize } from './models/index.js';
import adminOptions from './admin/options.js';
import { authenticate } from './admin/auth.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';

// Import AdminJS Express with correct syntax for new versions
import AdminJSExpress from '@adminjs/express';

const app = express();
const PORT = process.env.PORT || 3000;

// AdminJS setup (must be before body-parser)
const admin = new AdminJS(adminOptions);

// Session store for AdminJS
const PgSession = ConnectPgSimple(session);
const adminSessionStore = new PgSession({
  conString: process.env.DATABASE_URL,
  tableName: 'adminjs_session',
  createTableIfMissing: true,
});

// Session configuration
const sessionOptions = {
  store: adminSessionStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.JWT_SECRET,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  name: 'adminjs',
};

// Build authenticated router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookiePassword: process.env.JWT_SECRET,
  },
  null,
  sessionOptions
);

app.use(admin.options.rootPath, adminRouter);

// Session configuration for API routes
const sessionStore = new PgSession({
  conString: process.env.DATABASE_URL,
  tableName: 'session',
  createTableIfMissing: true,
});

const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  },
  name: 'api.sid', // Different name for API session
});

// Apply body parser and session only to API routes (not AdminJS)
app.use('/api', express.json());
app.use('/api', express.urlencoded({ extended: true }));
app.use('/api', sessionMiddleware);
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'eCommerce Admin API',
    endpoints: {
      admin: admin.options.rootPath,
      login: '/api/login',
      logout: '/api/logout',
    },
  });
});

// Database sync and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync();
    console.log('✅ Database synchronized.');

    const { User } = await import('./models/index.js');
    const adminExists = await User.findOne({ 
      where: { email: process.env.ADMIN_EMAIL } 
    });

    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log('✅ Default admin user created.');
    }

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
      console.log(`\n👤 Admin Login:`);
      console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD}\n`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
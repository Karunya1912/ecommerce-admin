import 'dotenv/config';
import { User, sequelize } from './src/models/index.js';

const createAdminUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Check if admin exists
    const adminExists = await User.findOne({
      where: { email: process.env.ADMIN_EMAIL }
    });

    if (adminExists) {
      console.log('⚠️  Admin user already exists');
      console.log('Email:', adminExists.email);
      console.log('Role:', adminExists.role);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('\n👤 You can now login with:');
    console.log('   Email:', process.env.ADMIN_EMAIL);
    console.log('   Password:', process.env.ADMIN_PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdminUser();

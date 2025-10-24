# Testing Instructions

## 1. Setup Database
```bash
# Create PostgreSQL database
createdb ecommerce_admin

# Or using psql
psql -U postgres
CREATE DATABASE ecommerce_admin;
\q
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Configure Environment

Copy and edit `.env` file with your database credentials.

## 4. Run Migrations
```bash
npm run dev
```

This will:
- Sync database tables
- Create default admin user
- Start the server

## 5. Seed Sample Data (Optional)
```bash
node -e "require('./src/config/seeders').seedDatabase().then(() => process.exit())"
```

## 6. Test Authentication

### Login via API
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Access AdminJS
Open browser: `http://localhost:3000/admin`
- Email: admin@example.com
- Password: admin123

## 7. Test Role-Based Access

Create a regular user and test limited access:
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

Regular users should NOT see:
- Users table
- Settings table

## 8. Common Issues

### Database Connection Error
- Check PostgreSQL is running
- Verify credentials in `.env`

### Port Already in Use
- Change PORT in `.env`
- Or kill process using port 3000

### Session Issues
- Clear browser cookies
- Restart server
import 'dotenv/config';
import { User, sequelize } from './src/models/index.js';

const createRegularUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Check if regular user already exists
    const existingUser = await User.findOne({
      where: { email: 'user@example.com' }
    });

    if (existingUser) {
      console.log('⚠️ Regular user already exists');
      console.log('Email: user@example.com');
      console.log('You can use this account to test regular user access');
      return;
    }

    // Create regular user
    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
      isActive: true,
    });

    console.log('✅ Regular user created successfully!');
    console.log('\n📋 Regular User Credentials:');
    console.log('   Email: user@example.com');
    console.log('   Password: user123');
    console.log('   Role: user');
    console.log('\nYou can use these credentials to test role-based access control.');

  } catch (error) {
    console.error('❌ Error creating regular user:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

createRegularUser();

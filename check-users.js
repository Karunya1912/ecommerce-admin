import 'dotenv/config';
import { User, sequelize } from './src/models/index.js';

const checkUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Get all users
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'isActive', 'createdAt']
    });

    console.log(`📊 Total users in database: ${users.length}\n`);

    if (users.length === 0) {
      console.log('⚠️  No users found in database');
    } else {
      console.log('Users:');
      users.forEach(user => {
        console.log('---');
        console.log('ID:', user.id);
        console.log('Name:', user.name);
        console.log('Email:', user.email);
        console.log('Role:', user.role);
        console.log('Active:', user.isActive);
        console.log('Created:', user.createdAt);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkUsers();

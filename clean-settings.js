import 'dotenv/config';
import { Setting, sequelize } from './src/models/index.js';

const cleanSettings = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Keys to keep
    const keepKeys = ['site_name', 'site_email', 'currency', 'maintenance_mode'];

    // Delete settings that are not in the keep list
    const deleted = await Setting.destroy({
      where: {
        key: {
          [sequelize.Sequelize.Op.notIn]: keepKeys
        }
      }
    });

    console.log(`✅ Deleted ${deleted} unnecessary settings`);

    // Show remaining settings
    const remaining = await Setting.findAll();
    console.log(`\n📊 Remaining settings (${remaining.length}):`);
    remaining.forEach(setting => {
      console.log(`   - ${setting.key}: ${setting.value}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning settings:', error.message);
    process.exit(1);
  }
};

cleanSettings();

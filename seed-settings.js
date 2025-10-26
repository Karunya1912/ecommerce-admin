import 'dotenv/config';
import { Setting, sequelize } from './src/models/index.js';

const seedSettings = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Default settings to seed - Simple and essential only
    const defaultSettings = [
      {
        key: 'site_name',
        value: 'eCommerce Admin',
        description: 'Website name',
        type: 'string',
        isPublic: true,
      },
      {
        key: 'site_email',
        value: 'admin@example.com',
        description: 'Contact email',
        type: 'string',
        isPublic: true,
      },
      {
        key: 'currency',
        value: 'USD',
        description: 'Default currency',
        type: 'string',
        isPublic: true,
      },
      {
        key: 'maintenance_mode',
        value: 'false',
        description: 'Site maintenance status',
        type: 'boolean',
        isPublic: false,
      },
    ];

    // Create or update settings
    for (const setting of defaultSettings) {
      const [record, created] = await Setting.findOrCreate({
        where: { key: setting.key },
        defaults: setting,
      });

      if (!created) {
        console.log(`⚠️  Setting '${setting.key}' already exists, skipping...`);
      } else {
        console.log(`✅ Created setting: ${setting.key}`);
      }
    }

    console.log('\n✅ Settings seeding completed successfully!');
    console.log(`\n📊 Total settings in database: ${await Setting.count()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding settings:', error.message);
    process.exit(1);
  }
};

seedSettings();

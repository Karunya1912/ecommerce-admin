import { ComponentLoader } from 'adminjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

// Register custom components with absolute paths
const Components = {
  AdminDashboard: componentLoader.add('AdminDashboard', path.join(__dirname, 'components/AdminDashboard')),
  UserDashboard: componentLoader.add('UserDashboard', path.join(__dirname, 'components/UserDashboard')),
  SettingsPage: componentLoader.add('SettingsPage', path.join(__dirname, 'components/SettingsPage')),
};

export { componentLoader, Components };

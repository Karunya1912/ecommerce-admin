import { ComponentLoader } from 'adminjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

// Register custom components with absolute paths
const Components = {
  SettingsPage: componentLoader.add('SettingsPage', path.join(__dirname, 'components/SettingsPage')),
  ProductCatalog: componentLoader.add('ProductCatalog', path.join(__dirname, 'components/ProductCatalog')),
  ProductListCards: componentLoader.add('ProductListCards', path.join(__dirname, 'components/ProductListCards')),
  Dashboard: componentLoader.add('Dashboard', path.join(__dirname, 'components/Dashboard')),
  AdminDashboard: componentLoader.add('AdminDashboard', path.join(__dirname, 'components/AdminDashboard')),
  UserDashboard: componentLoader.add('UserDashboard', path.join(__dirname, 'components/UserDashboard')),
};

export { componentLoader, Components };

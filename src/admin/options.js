import AdminJS from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { componentLoader, Components } from './component-loader.js';
import {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting
} from '../models/index.js';

// Register Sequelize adapter
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

// User resource configuration
const userResourceOptions = {
  resource: User,
  options: {
    navigation: {
      name: 'User Management',
      icon: 'User',
    },
    properties: {
      password: {
        isVisible: false,
      },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      lastLogin: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      list: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      show: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    // Hide Users resource from regular users
    isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
  },
};

// Category resource configuration
const categoryResourceOptions = {
  resource: Category,
  options: {
    navigation: ({ currentAdmin }) => {
      if (currentAdmin && currentAdmin.role === 'admin') {
        return {
          name: 'Product Management',
          icon: 'Tag',
        };
      }
      return false; // Hide from user sidebar
    },
    properties: {
      slug: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      list: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      show: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    // Hide entire resource from users
    isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
  },
};

// Product resource configuration
const productResourceOptions = {
  resource: Product,
  options: {
    navigation: ({ currentAdmin }) => {
      if (currentAdmin && currentAdmin.role === 'admin') {
        return {
          name: 'Product Management',
          icon: 'ShoppingCart',
        };
      } else if (currentAdmin && currentAdmin.role === 'user') {
        return {
          name: 'Navigation',
          icon: 'ShoppingCart',
        };
      }
      return false;
    },
    properties: {
      categoryId: {
        isVisible: false,
      },
      category: {
        isVisible: true,
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      list: {
        isAccessible: true,
      },
      show: {
        isAccessible: true,
      },
    },
  },
};

// Order resource configuration
const orderResourceOptions = {
  resource: Order,
  options: {
    navigation: ({ currentAdmin }) => {
      if (currentAdmin && currentAdmin.role === 'admin') {
        return {
          name: 'Order Management',
          icon: 'Package',
        };
      } else if (currentAdmin && currentAdmin.role === 'user') {
        return {
          name: 'Navigation',
          icon: 'Package',
        };
      }
      return false;
    },
    properties: {
      userId: {
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      user: {
        isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      orderNumber: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'user',
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      list: {
        isAccessible: true, // All users can view their orders
        before: async (request, { currentAdmin }) => {
          // Normal users can only see their own orders
          if (currentAdmin.role === 'user') {
            if (!request.query) request.query = {};
            request.query['filters.userId'] = currentAdmin.id;
          }
          return request;
        },
      },
      show: {
        isAccessible: true, // All users can view details
      },
    },
  },
};

// OrderItem resource configuration
const orderItemResourceOptions = {
  resource: OrderItem,
  options: {
    navigation: {
      name: 'Order Management',
      icon: 'List',
    },
    properties: {
      orderId: {
        isVisible: false,
      },
      productId: {
        isVisible: false,
      },
      order: {
        isVisible: true,
      },
      product: {
        isVisible: true,
      },
      subtotal: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      list: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      show: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
    },
    // Hide OrderItems from regular users
    isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
  },
};

// Setting resource configuration
const settingResourceOptions = {
  resource: Setting,
  options: {
    navigation: {
      name: 'Configuration',
      icon: 'Settings',
    },
    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
    isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
  },
};

const adminOptions = {
  componentLoader,
  resources: [
    userResourceOptions,
    categoryResourceOptions,
    productResourceOptions,
    orderResourceOptions,
    orderItemResourceOptions,
    settingResourceOptions,
  ],
  pages: {
    'product-catalog': {
      component: Components.ProductCatalog,
      icon: 'ShoppingCart',
    },
  },
  dashboard: {
    component: Components.UserDashboard,
  },
  rootPath: '/admin',
  branding: {
    companyName: 'eCommerce Admin',
    logo: false,
    softwareBrothers: false,
    withMadeWithLove: false,
    favicon: false,
  },
  assets: {
    styles: ['/admin-custom.css'],
  },
};

export default adminOptions;
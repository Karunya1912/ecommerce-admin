import AdminJS from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';
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
        isAccessible: true,
      },
    },
  },
};

// Category resource configuration
const categoryResourceOptions = {
  resource: Category,
  options: {
    navigation: {
      name: 'Product Management',
      icon: 'Tag',
    },
    properties: {
      slug: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
  },
};

// Product resource configuration
const productResourceOptions = {
  resource: Product,
  options: {
    navigation: {
      name: 'Product Management',
      icon: 'ShoppingCart',
    },
    properties: {
      categoryId: {
        isVisible: false,
      },
      category: {
        isVisible: true,
      },
    },
  },
};

// Order resource configuration
const orderResourceOptions = {
  resource: Order,
  options: {
    navigation: {
      name: 'Order Management',
      icon: 'Package',
    },
    properties: {
      userId: {
        isVisible: false,
      },
      user: {
        isVisible: true,
      },
      orderNumber: {
        isVisible: { list: true, filter: true, show: true, edit: false },
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
  },
};

const adminOptions = {
  resources: [
    userResourceOptions,
    categoryResourceOptions,
    productResourceOptions,
    orderResourceOptions,
    orderItemResourceOptions,
    settingResourceOptions,
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'eCommerce Admin',
    logo: false,
    softwareBrothers: false,
  },
};

export default adminOptions;
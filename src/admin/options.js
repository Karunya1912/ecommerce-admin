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
        type: 'password',
        isVisible: {
          list: false,
          filter: false,
          show: false,
          edit: true,
          new: true
        },
      },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      lastLogin: {
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
        before: async (request) => {
          // For edit, remove password from payload if empty
          if (request.payload && request.payload.password === '') {
            delete request.payload.password;
          }
          return request;
        },
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
    navigation: {
      name: 'Navigation',
      icon: 'Tag',
    },
    properties: {
      slug: {
        isVisible: { list: false, filter: true, show: true, edit: false },
      },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
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
        isAccessible: () => true,
      },
      show: {
        isAccessible: () => true,
      },
    },
  },
};

// Product resource configuration
const productResourceOptions = {
  resource: Product,
  options: {
    navigation: {
      name: 'Navigation',
      icon: 'ShoppingCart',
    },
    listProperties: ['id', 'name', 'categoryId', 'price', 'stock', 'isActive', 'createdAt'],
    properties: {
      categoryId: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      category: {
        isVisible: false,
      },
      imageUrl: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      description: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      sku: {
        isVisible: { list: false, filter: true, show: true, edit: true },
      },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
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
        isAccessible: () => true,
      },
      show: {
        isAccessible: () => true,
      },
    },
  },
};

// Order resource configuration
const orderResourceOptions = {
  resource: Order,
  options: {
    navigation: {
      name: 'Navigation',
      icon: 'Package',
    },
    listProperties: ['id', 'orderNumber', 'totalAmount', 'status', 'paymentStatus', 'createdAt'],
    properties: {
      userId: {
        isVisible: false,
      },
      user: {
        isVisible: false, // Hidden from list view
      },
      orderNumber: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      notes: {
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'user',
        before: async (request, context) => {
          // For regular users, automatically set the userId to current user
          if (context.currentAdmin && context.currentAdmin.role === 'user' && request.payload) {
            request.payload.userId = context.currentAdmin.id;
          }
          return request;
        },
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      },
      list: {
        isAccessible: () => true,
        before: async (request, context) => {
          // For regular users, filter to show only their own orders
          // For admins, show all orders
          const { currentAdmin } = context;
          if (currentAdmin && currentAdmin.role === 'user') {
            if (!request.query) request.query = {};
            request.query['filters.userId'] = currentAdmin.id;
          }
          // Admin sees all orders (no filter applied)
          return request;
        },
      },
      show: {
        isAccessible: () => true,
        before: async (request, context) => {
          // For regular users, verify order belongs to them
          // For admins, allow viewing any order
          const { currentAdmin } = context;
          if (currentAdmin && currentAdmin.role === 'user') {
            const orderId = request.params.recordId;
            const order = await Order.findByPk(orderId);
            if (order && order.userId !== currentAdmin.id) {
              throw new Error('Access denied: This order does not belong to you');
            }
          }
          return request;
        },
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
    listProperties: ['id', 'orderId', 'productId', 'quantity', 'price', 'subtotal', 'createdAt'],
    properties: {
      orderId: {
        isVisible: true,
      },
      productId: {
        isVisible: true,
      },
      quantity: {
        isVisible: true,
      },
      price: {
        isVisible: true,
      },
      subtotal: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      createdAt: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
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
    properties: {
      id: {
        isVisible: { list: false, filter: false, show: true, edit: false, new: false },
      },
      key: {
        isVisible: true,
        isRequired: true,
      },
      value: {
        isVisible: true,
        type: 'textarea',
      },
      description: {
        isVisible: true,
      },
      type: {
        isVisible: true,
        availableValues: [
          { value: 'string', label: 'String' },
          { value: 'number', label: 'Number' },
          { value: 'boolean', label: 'Boolean' },
          { value: 'json', label: 'JSON' }
        ],
      },
      isPublic: {
        isVisible: true,
      },
      createdAt: {
        isVisible: { list: false, filter: false, show: true, edit: false, new: false },
      },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false, new: false },
      },
    },
    listProperties: ['key', 'value', 'type', 'isPublic'],
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
    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
    isVisible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
  },
};

const adminOptions = {
  componentLoader,
  dashboard: {
    component: Components.Dashboard,
  },
  resources: [
    userResourceOptions,
    categoryResourceOptions,
    productResourceOptions,
    orderResourceOptions,
    orderItemResourceOptions,
    settingResourceOptions,
  ],
  pages: {},
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
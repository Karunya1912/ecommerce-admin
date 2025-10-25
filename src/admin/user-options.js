import AdminJS from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { componentLoader, Components } from './component-loader.js';
import {
  Category,
  Product,
  Order,
} from '../models/index.js';

// Register Sequelize adapter
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

// Category resource configuration - READ ONLY for users
const categoryResourceOptions = {
  resource: Category,
  options: {
    navigation: {
      name: 'Products',
      icon: 'Tag',
    },
    properties: {
      slug: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isVisible: false,
      },
      edit: {
        isVisible: false,
      },
      delete: {
        isVisible: false,
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

// Product resource configuration - READ ONLY for users
const productResourceOptions = {
  resource: Product,
  options: {
    navigation: {
      name: 'Products',
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
    actions: {
      new: {
        isVisible: false,
      },
      edit: {
        isVisible: false,
      },
      delete: {
        isVisible: false,
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

// Order resource configuration - Users can only see their own orders
const orderResourceOptions = {
  resource: Order,
  options: {
    navigation: {
      name: 'My Orders',
      icon: 'Package',
    },
    properties: {
      userId: {
        isVisible: false,
      },
      user: {
        isVisible: false,
      },
      orderNumber: {
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
    },
    actions: {
      new: {
        isAccessible: true,
        before: async (request, context) => {
          // Automatically set the userId to current user
          if (request.payload) {
            request.payload.userId = context.currentAdmin.id;
          }
          return request;
        },
      },
      edit: {
        isVisible: false, // Users cannot edit orders after creation
      },
      delete: {
        isVisible: false, // Users cannot delete orders
      },
      list: {
        isAccessible: true,
        before: async (request, { currentAdmin }) => {
          // Filter to show only current user's orders
          if (!request.query) request.query = {};
          request.query['filters.userId'] = currentAdmin.id;
          return request;
        },
      },
      show: {
        isAccessible: true,
        before: async (request, { currentAdmin }) => {
          // Verify order belongs to current user
          const orderId = request.params.recordId;
          const order = await Order.findByPk(orderId);
          if (order && order.userId !== currentAdmin.id) {
            throw new Error('Access denied: This order does not belong to you');
          }
          return request;
        },
      },
    },
  },
};

const userPanelOptions = {
  componentLoader,
  resources: [
    productResourceOptions,
    categoryResourceOptions,
    orderResourceOptions,
  ],
  pages: {
    userDashboard: {
      label: 'My Dashboard',
      icon: 'Home',
      component: Components.UserDashboard,
    },
  },
  dashboard: {
    handler: async (_request, _response, context) => {
      const { currentAdmin } = context;
      return {
        message: 'Welcome to Your Dashboard',
        user: currentAdmin,
      };
    },
  },
  rootPath: '/user',
  branding: {
    companyName: 'My Account',
    logo: false,
    softwareBrothers: false,
  },
};

export default userPanelOptions;

import sequelize from '../config/database.js';
import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Setting from './Setting.js';

// Product - Category relationship
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products'
});

// Order - User relationship
Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
});

// OrderItem - Order relationship
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});

// OrderItem - Product relationship
OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
});

export {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Setting
};
import dotenv from 'dotenv';
dotenv.config();

import { User, Category, Product, Order, OrderItem, Setting } from './src/models/index.js';
import sequelize from './src/config/database.js';

async function seedData() {
  try {
    console.log('🌱 Starting database seeding...');

    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Find or create user@example.com
    let [user] = await User.findOrCreate({
      where: { email: 'user@example.com' },
      defaults: {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user',
      }
    });

    console.log('✅ User created/found: user@example.com');

    // Create categories
    const categories = await Promise.all([
      Category.findOrCreate({ where: { name: 'Electronics' }, defaults: { description: 'Electronic devices and gadgets' }}),
      Category.findOrCreate({ where: { name: 'Clothing' }, defaults: { description: 'Fashion and apparel' }}),
      Category.findOrCreate({ where: { name: 'Books' }, defaults: { description: 'Books and publications' }}),
      Category.findOrCreate({ where: { name: 'Home & Garden' }, defaults: { description: 'Home and garden items' }}),
    ]);

    console.log('✅ Categories created');

    // Create products
    const productData = [
      { name: 'MacBook Pro 16"', description: 'High-performance laptop', price: 2499.99, sku: 'ELEC-001', stock: 25, categoryId: categories[0][0].id },
      { name: 'iPhone 15 Pro', description: 'Latest iPhone model', price: 1199.99, sku: 'ELEC-002', stock: 50, categoryId: categories[0][0].id },
      { name: 'Sony Headphones', description: 'Noise-canceling headphones', price: 399.99, sku: 'ELEC-003', stock: 75, categoryId: categories[0][0].id },
      { name: 'Samsung TV 55"', description: '4K Smart TV', price: 649.99, sku: 'ELEC-004', stock: 30, categoryId: categories[0][0].id },
      { name: 'Premium T-Shirt', description: 'Organic cotton t-shirt', price: 29.99, sku: 'CLTH-001', stock: 200, categoryId: categories[1][0].id },
      { name: 'Denim Jeans', description: 'Classic fit jeans', price: 79.99, sku: 'CLTH-002', stock: 150, categoryId: categories[1][0].id },
      { name: 'Winter Jacket', description: 'Waterproof winter jacket', price: 159.99, sku: 'CLTH-003', stock: 80, categoryId: categories[1][0].id },
      { name: 'JavaScript Book', description: 'Learn JavaScript', price: 49.99, sku: 'BOOK-001', stock: 100, categoryId: categories[2][0].id },
      { name: 'Coffee Maker', description: 'Programmable coffee maker', price: 89.99, sku: 'HOME-001', stock: 60, categoryId: categories[3][0].id },
      { name: 'Yoga Mat', description: 'Non-slip exercise mat', price: 34.99, sku: 'SPORT-001', stock: 150, categoryId: categories[3][0].id },
    ];

    const products = [];
    for (const prod of productData) {
      const [product] = await Product.findOrCreate({ where: { sku: prod.sku }, defaults: prod });
      products.push(product);
    }

    console.log('✅ Products created');

    // Create orders for user
    const order1 = await Order.create({
      userId: user.id,
      totalAmount: 2529.98,
      shippingAddress: '123 Main Street, New York, NY 10001',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      status: 'delivered',
    });

    await OrderItem.bulkCreate([
      { orderId: order1.id, productId: products[0].id, quantity: 1, price: products[0].price, subtotal: products[0].price * 1 },
      { orderId: order1.id, productId: products[4].id, quantity: 1, price: products[4].price, subtotal: products[4].price * 1 },
    ]);

    const order2 = await Order.create({
      userId: user.id,
      totalAmount: 1599.98,
      shippingAddress: '123 Main Street, New York, NY 10001',
      paymentMethod: 'PayPal',
      paymentStatus: 'paid',
      status: 'shipped',
    });

    await OrderItem.bulkCreate([
      { orderId: order2.id, productId: products[1].id, quantity: 1, price: products[1].price, subtotal: products[1].price * 1 },
      { orderId: order2.id, productId: products[2].id, quantity: 1, price: products[2].price, subtotal: products[2].price * 1 },
    ]);

    const order3 = await Order.create({
      userId: user.id,
      totalAmount: 289.97,
      shippingAddress: '123 Main Street, New York, NY 10001',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      status: 'processing',
    });

    await OrderItem.bulkCreate([
      { orderId: order3.id, productId: products[6].id, quantity: 1, price: products[6].price, subtotal: products[6].price * 1 },
      { orderId: order3.id, productId: products[7].id, quantity: 1, price: products[7].price, subtotal: products[7].price * 1 },
      { orderId: order3.id, productId: products[8].id, quantity: 1, price: products[8].price, subtotal: products[8].price * 1 },
    ]);

    console.log('✅ Orders created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - User: user@example.com / user123');
    console.log('   - Categories: 4');
    console.log('   - Products: 10');
    console.log('   - Orders: 3\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedData();

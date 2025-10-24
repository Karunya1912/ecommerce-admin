const { 
  User, 
  Category, 
  Product, 
  Order, 
  OrderItem, 
  Setting 
} = require('../models');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Create sample users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
      },
    ]);

    // Create categories
    const categories = await Category.bulkCreate([
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      { name: 'Books', description: 'Books and publications' },
    ]);

    // Create products
    const products = await Product.bulkCreate([
      {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 999.99,
        sku: 'ELEC-001',
        stock: 50,
        categoryId: categories[0].id,
      },
      {
        name: 'T-Shirt',
        description: 'Cotton t-shirt',
        price: 19.99,
        sku: 'CLTH-001',
        stock: 100,
        categoryId: categories[1].id,
      },
      {
        name: 'JavaScript Book',
        description: 'Learn JavaScript programming',
        price: 29.99,
        sku: 'BOOK-001',
        stock: 75,
        categoryId: categories[2].id,
      },
    ]);

    // Create orders
    const order = await Order.create({
      userId: users[0].id,
      totalAmount: 1049.97,
      shippingAddress: '123 Main St, City, State 12345',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
    });

    // Create order items
    await OrderItem.bulkCreate([
      {
        orderId: order.id,
        productId: products[0].id,
        quantity: 1,
        price: products[0].price,
      },
      {
        orderId: order.id,
        productId: products[1].id,
        quantity: 2,
        price: products[1].price,
      },
    ]);

    // Create settings
    await Setting.bulkCreate([
      {
        key: 'site_name',
        value: 'eCommerce Store',
        description: 'Name of the website',
        type: 'string',
        isPublic: true,
      },
      {
        key: 'tax_rate',
        value: '0.08',
        description: 'Tax rate for orders',
        type: 'number',
        isPublic: false,
      },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = { seedDatabase };
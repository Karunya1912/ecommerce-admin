import dotenv from 'dotenv';
dotenv.config();

import { User, Category, Product, Order, OrderItem } from './src/models/index.js';
import { sequelize } from './src/models/index.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await OrderItem.destroy({ where: {}, truncate: true, cascade: true });
    await Order.destroy({ where: {}, truncate: true, cascade: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Category.destroy({ where: {}, truncate: true, cascade: true });
    // Don't delete users to keep admin account
    console.log('✅ Existing data cleared\n');

    // Create Categories
    console.log('📁 Creating categories...');
    const categories = await Category.bulkCreate([
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices, gadgets and accessories',
        isActive: true
      },
      {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel for all ages',
        isActive: true
      },
      {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home improvement and garden supplies',
        isActive: true
      },
      {
        name: 'Books',
        slug: 'books',
        description: 'Physical and digital books',
        isActive: true
      },
      {
        name: 'Sports & Outdoors',
        slug: 'sports-outdoors',
        description: 'Sports equipment and outdoor gear',
        isActive: true
      },
      {
        name: 'Toys & Games',
        slug: 'toys-games',
        description: 'Toys, games and collectibles',
        isActive: true
      },
      {
        name: 'Beauty & Health',
        slug: 'beauty-health',
        description: 'Beauty products and health supplements',
        isActive: true
      },
      {
        name: 'Furniture',
        slug: 'furniture',
        description: 'Home and office furniture',
        isActive: true
      },
      {
        name: 'Automotive',
        slug: 'automotive',
        description: 'Car parts and accessories',
        isActive: true
      },
      {
        name: 'Food & Beverages',
        slug: 'food-beverages',
        description: 'Groceries and beverages',
        isActive: true
      }
    ]);
    console.log(`✅ Created ${categories.length} categories\n`);

    // Create Products
    console.log('📦 Creating products...');
    const products = [];

    // Electronics (30 products)
    const electronicsProducts = [
      { name: 'iPhone 15 Pro', price: 299999.00, stock: 25, sku: 'ELEC-IP15P-001' },
      { name: 'Samsung Galaxy S24', price: 249999.00, stock: 30, sku: 'ELEC-SGS24-001' },
      { name: 'MacBook Pro 14"', price: 499999.00, stock: 15, sku: 'ELEC-MBP14-001' },
      { name: 'Dell XPS 15', price: 349999.00, stock: 18, sku: 'ELEC-DX15-001' },
      { name: 'iPad Air', price: 149999.00, stock: 22, sku: 'ELEC-IPA-001' },
      { name: 'AirPods Pro', price: 59999.00, stock: 45, sku: 'ELEC-APP-001' },
      { name: 'Sony WH-1000XM5', price: 89999.00, stock: 12, sku: 'ELEC-SWH-001' },
      { name: 'Apple Watch Series 9', price: 99999.00, stock: 28, sku: 'ELEC-AWS9-001' },
      { name: 'Samsung 55" QLED TV', price: 189999.00, stock: 8, sku: 'ELEC-STV55-001' },
      { name: 'LG OLED 65"', price: 399999.00, stock: 5, sku: 'ELEC-LGO65-001' },
      { name: 'Nintendo Switch OLED', price: 79999.00, stock: 35, sku: 'ELEC-NSW-001' },
      { name: 'PlayStation 5', price: 129999.00, stock: 10, sku: 'ELEC-PS5-001' },
      { name: 'Xbox Series X', price: 119999.00, stock: 12, sku: 'ELEC-XSX-001' },
      { name: 'Canon EOS R6', price: 599999.00, stock: 6, sku: 'ELEC-CEOSR6-001' },
      { name: 'GoPro Hero 12', price: 99999.00, stock: 20, sku: 'ELEC-GPH12-001' },
      { name: 'Bose SoundLink', price: 29999.00, stock: 32, sku: 'ELEC-BSL-001' },
      { name: 'Kindle Paperwhite', price: 34999.00, stock: 40, sku: 'ELEC-KPW-001' },
      { name: 'Logitech MX Master 3', price: 24999.00, stock: 50, sku: 'ELEC-LMX3-001' },
      { name: 'Mechanical Keyboard RGB', price: 19999.00, stock: 15, sku: 'ELEC-MKR-001' },
      { name: 'Webcam 4K Pro', price: 29999.00, stock: 8, sku: 'ELEC-W4K-001' },
      { name: 'USB-C Hub 7-in-1', price: 12999.00, stock: 60, sku: 'ELEC-UCH7-001' },
      { name: 'Portable SSD 2TB', price: 39999.00, stock: 25, sku: 'ELEC-PSSD2-001' },
      { name: 'Wireless Charger', price: 7999.00, stock: 70, sku: 'ELEC-WC-001' },
      { name: 'Smart Home Hub', price: 24999.00, stock: 18, sku: 'ELEC-SHH-001' },
      { name: 'Ring Doorbell Pro', price: 44999.00, stock: 14, sku: 'ELEC-RDP-001' },
      { name: 'Philips Hue Starter Kit', price: 34999.00, stock: 22, sku: 'ELEC-PHS-001' },
      { name: 'Fitbit Charge 6', price: 39999.00, stock: 30, sku: 'ELEC-FBC6-001' },
      { name: 'DJI Mini 3 Drone', price: 149999.00, stock: 7, sku: 'ELEC-DM3-001' },
      { name: 'Anker PowerBank 20000', price: 14999.00, stock: 55, sku: 'ELEC-APB20-001' },
      { name: 'Samsung Galaxy Buds Pro', price: 39999.00, stock: 28, sku: 'ELEC-SGBP-001' }
    ];

    // Clothing (20 products)
    const clothingProducts = [
      { name: 'Levi\'s 501 Jeans', price: 14999.00, stock: 45, sku: 'CLO-L501-001' },
      { name: 'Nike Air Max Sneakers', price: 24999.00, stock: 35, sku: 'CLO-NAM-001' },
      { name: 'Adidas Hoodie', price: 12999.00, stock: 50, sku: 'CLO-AH-001' },
      { name: 'Ralph Lauren Polo Shirt', price: 18999.00, stock: 40, sku: 'CLO-RLP-001' },
      { name: 'Winter Parka Jacket', price: 34999.00, stock: 20, sku: 'CLO-WPJ-001' },
      { name: 'Formal Dress Shirt', price: 9999.00, stock: 60, sku: 'CLO-FDS-001' },
      { name: 'Yoga Pants', price: 7999.00, stock: 55, sku: 'CLO-YP-001' },
      { name: 'Running Shorts', price: 5999.00, stock: 65, sku: 'CLO-RS-001' },
      { name: 'Leather Jacket', price: 49999.00, stock: 12, sku: 'CLO-LJ-001' },
      { name: 'Cashmere Sweater', price: 29999.00, stock: 18, sku: 'CLO-CS-001' },
      { name: 'Summer Dress', price: 16999.00, stock: 30, sku: 'CLO-SD-001' },
      { name: 'Business Suit', price: 79999.00, stock: 10, sku: 'CLO-BS-001' },
      { name: 'Graphic T-Shirt Pack', price: 8999.00, stock: 75, sku: 'CLO-GTP-001' },
      { name: 'Denim Jacket', price: 19999.00, stock: 25, sku: 'CLO-DJ-001' },
      { name: 'Swim Trunks', price: 6999.00, stock: 40, sku: 'CLO-ST-001' },
      { name: 'Winter Scarf Set', price: 4999.00, stock: 50, sku: 'CLO-WSS-001' },
      { name: 'Baseball Cap', price: 3999.00, stock: 80, sku: 'CLO-BC-001' },
      { name: 'Wool Socks 6-Pack', price: 2999.00, stock: 100, sku: 'CLO-WS6-001' },
      { name: 'Leather Belt', price: 7999.00, stock: 45, sku: 'CLO-LB-001' },
      { name: 'Sports Bra', price: 5999.00, stock: 55, sku: 'CLO-SB-001' }
    ];

    // Add products with different stock levels (including low stock items)
    for (const cat of categories) {
      let productsForCategory = [];

      if (cat.name === 'Electronics') {
        productsForCategory = electronicsProducts;
      } else if (cat.name === 'Clothing') {
        productsForCategory = clothingProducts;
      } else {
        // Generate 10 products for other categories
        for (let i = 0; i < 10; i++) {
          productsForCategory.push({
            name: `${cat.name} Product ${i + 1}`,
            price: Math.floor(Math.random() * 50000) + 5000,
            stock: i < 3 ? Math.floor(Math.random() * 15) : Math.floor(Math.random() * 80) + 20, // First 3 have low stock
            sku: `${cat.name.substring(0, 3).toUpperCase()}-PRD-${String(i + 1).padStart(3, '0')}`
          });
        }
      }

      for (const prod of productsForCategory) {
        products.push({
          ...prod,
          description: `High-quality ${prod.name} from our ${cat.name} collection`,
          categoryId: cat.id,
          imageUrl: `https://via.placeholder.com/300?text=${encodeURIComponent(prod.name)}`,
          isActive: true
        });
      }
    }

    await Product.bulkCreate(products);
    console.log(`✅ Created ${products.length} products\n`);

    // Get or create test users
    console.log('👥 Creating/getting users...');
    const adminUser = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });

    let regularUsers = await User.findAll({ where: { role: 'user' } });

    if (regularUsers.length === 0) {
      regularUsers = await User.bulkCreate([
        { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'user' },
        { name: 'Mike Johnson', email: 'mike@example.com', password: 'password123', role: 'user' },
        { name: 'Sarah Williams', email: 'sarah@example.com', password: 'password123', role: 'user' },
        { name: 'David Brown', email: 'david@example.com', password: 'password123', role: 'user' }
      ], {
        individualHooks: true // Enable password hashing
      });
    }
    console.log(`✅ ${regularUsers.length} users available\n`);

    // Create Orders
    console.log('🛒 Creating orders...');
    const orders = [];
    const orderItems = [];
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const paymentMethods = ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'];
    const paymentStatuses = ['pending', 'paid', 'failed'];

    // Create 50+ orders over the past few months
    const allProducts = await Product.findAll();

    for (let i = 0; i < 60; i++) {
      const randomUser = regularUsers[Math.floor(Math.random() * regularUsers.length)];
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 90)); // Orders from last 90 days

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const paymentStatus = status === 'delivered' ? 'paid' : paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

      // Select 1-5 random products for this order
      const numItems = Math.floor(Math.random() * 5) + 1;
      const orderProducts = [];
      const usedProductIds = new Set();

      for (let j = 0; j < numItems; j++) {
        let product;
        do {
          product = allProducts[Math.floor(Math.random() * allProducts.length)];
        } while (usedProductIds.has(product.id));

        usedProductIds.add(product.id);
        orderProducts.push(product);
      }

      const totalAmount = orderProducts.reduce((sum, p) => {
        const quantity = Math.floor(Math.random() * 3) + 1;
        return sum + (parseFloat(p.price) * quantity);
      }, 0);

      const order = await Order.create({
        userId: randomUser.id,
        status,
        totalAmount,
        shippingAddress: `${Math.floor(Math.random() * 999) + 1} Main Street, Colombo ${Math.floor(Math.random() * 15) + 1}, Sri Lanka`,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        paymentStatus,
        notes: i % 5 === 0 ? 'Please handle with care' : null,
        createdAt: orderDate,
        updatedAt: orderDate
      });

      // Create order items
      for (const product of orderProducts) {
        const quantity = Math.floor(Math.random() * 3) + 1;
        const price = parseFloat(product.price);
        orderItems.push({
          orderId: order.id,
          productId: product.id,
          quantity,
          price: price,
          subtotal: quantity * price
        });
      }

      orders.push(order);
    }

    await OrderItem.bulkCreate(orderItems);
    console.log(`✅ Created ${orders.length} orders with ${orderItems.length} order items\n`);

    // Display summary
    const summary = {
      categories: await Category.count(),
      products: await Product.count(),
      users: await User.count(),
      orders: await Order.count(),
      orderItems: await OrderItem.count(),
      totalRevenue: await Order.sum('totalAmount', { where: { paymentStatus: 'paid' } }),
      lowStockProducts: await Product.count({ where: { stock: { [sequelize.Sequelize.Op.lt]: 20 } } })
    };

    console.log('📊 Database Seeding Summary:');
    console.log('================================');
    console.log(`📁 Categories:      ${summary.categories}`);
    console.log(`📦 Products:        ${summary.products}`);
    console.log(`👥 Users:           ${summary.users}`);
    console.log(`🛒 Orders:          ${summary.orders}`);
    console.log(`📝 Order Items:     ${summary.orderItems}`);
    console.log(`💰 Total Revenue:   LKR ${parseFloat(summary.totalRevenue || 0).toLocaleString()}`);
    console.log(`⚠️  Low Stock:       ${summary.lowStockProducts} products`);
    console.log('================================\n');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n🚀 You can now run: npm start');
    console.log('📊 Visit your dashboard at: http://localhost:3000/admin\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

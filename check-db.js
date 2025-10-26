import dotenv from 'dotenv';
dotenv.config();

import { Category, Product, Order } from './src/models/index.js';

async function checkDatabase() {
  try {
    const categoriesCount = await Category.count();
    const productsCount = await Product.count();
    const ordersCount = await Order.count();

    console.log('Database Check:');
    console.log(`Categories: ${categoriesCount}`);
    console.log(`Products: ${productsCount}`);
    console.log(`Orders: ${ordersCount}`);

    if (categoriesCount > 0) {
      const categories = await Category.findAll();
      console.log('\nCategories:', categories.map(c => ({ id: c.id, name: c.name })));
    }

    if (productsCount > 0) {
      const products = await Product.findAll({ limit: 3 });
      console.log('\nFirst 3 Products:', products.map(p => ({ id: p.id, name: p.name, stock: p.stock })));
    }

    if (ordersCount > 0) {
      const orders = await Order.findAll({ limit: 3 });
      console.log('\nFirst 3 Orders:', orders.map(o => ({ id: o.id, totalAmount: o.totalAmount, status: o.status })));
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase();

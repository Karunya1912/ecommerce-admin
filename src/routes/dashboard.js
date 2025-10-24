import express from 'express';
import { User, Order, Product, sequelize } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard-stats', authenticate, async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalProducts] = await Promise.all([
      User.count(),
      Order.count(),
      Product.count(),
    ]);

    const revenueResult = await Order.sum('totalAmount', {
      where: {
        paymentStatus: 'paid'
      }
    });

    const totalRevenue = revenueResult || 0;

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: parseFloat(totalRevenue),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard statistics' 
    });
  }
});

export default router;
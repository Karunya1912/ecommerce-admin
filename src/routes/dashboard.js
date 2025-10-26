import express from 'express';
import { User, Product, Order, Category } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/dashboard-stats', async (req, res) => {
  try {
    // AdminJS stores the user in req.session.adminjs
    // Check both AdminJS session and API session for compatibility
    const isAuthenticated = req.session?.adminjs || req.session?.adminUser;

    if (!isAuthenticated) {
      console.log('Unauthorized access attempt to dashboard-stats');
      console.log('Session:', req.session);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch statistics
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalCategories = await Category.count();
    const totalOrders = await Order.count();

    // Get active products count
    const activeProducts = await Product.count({
      where: { isActive: true }
    });

    // Get low stock products (stock < 10)
    const lowStockProducts = await Product.findAll({
      where: { stock: { [Op.lt]: 10 } },
      limit: 5,
      order: [['stock', 'ASC']],
      attributes: ['id', 'name', 'stock', 'price']
    });

    // Calculate total revenue from paid orders
    const orders = await Order.findAll({
      where: { paymentStatus: 'paid' }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);

    // Get pending orders
    const pendingOrders = await Order.count({
      where: { status: 'pending' }
    });

    // Get recent orders
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'orderNumber', 'totalAmount', 'status', 'paymentStatus', 'createdAt'],
      include: [{
        model: User,
        as: 'user',
        attributes: ['name', 'email']
      }]
    });

    res.json({
      totalUsers,
      totalProducts,
      totalCategories,
      activeProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      lowStockProducts,
      recentOrders
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;

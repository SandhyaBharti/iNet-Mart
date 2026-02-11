import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Activity from '../models/Activity.js';

// @desc    Get analytics data
// @route   GET /api/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
    try {
        // Inventory Summary
        const totalProducts = await Product.countDocuments();
        const activeProducts = await Product.countDocuments({ status: 'active' });
        const lowStockProducts = await Product.countDocuments({ stock: { $lte: 10 } });
        const outOfStockProducts = await Product.countDocuments({ status: 'out-of-stock' });

        // Category Distribution
        const categoryStats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Sales Metrics
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalAmount' }
                }
            }
        ]);

        const ordersByStatus = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Top Products by Sales
        const topProducts = await Order.aggregate([
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.productId',
                    productName: { $first: '$items.productName' },
                    totalQuantity: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 }
        ]);

        // Sales Trend (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const salesTrend = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Recent Activities
        const recentActivities = await Activity.find()
            .sort({ timestamp: -1 })
            .limit(10)
            .select('-__v');

        res.json({
            inventory: {
                totalProducts,
                activeProducts,
                lowStockProducts,
                outOfStockProducts,
                categoryStats
            },
            sales: {
                totalOrders,
                totalRevenue: totalRevenue[0]?.total || 0,
                ordersByStatus,
                topProducts,
                salesTrend
            },
            recentActivities
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get inventory insights
// @route   GET /api/analytics/inventory
// @access  Private
export const getInventoryInsights = async (req, res) => {
    try {
        const lowStockAlerts = await Product.find({ stock: { $lte: 10 }, status: 'active' })
            .select('name category stock')
            .sort({ stock: 1 });

        const categoryDistribution = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalStock: { $sum: '$stock' },
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
                }
            }
        ]);

        res.json({
            lowStockAlerts,
            categoryDistribution
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

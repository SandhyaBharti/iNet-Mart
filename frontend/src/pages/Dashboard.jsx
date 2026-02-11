import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const { data } = await api.get('/analytics');
            setAnalytics(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">{error}</div>
        </div>
    );
    if (!analytics) return null;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
                    <p className="text-slate-400">Overview of your inventory and sales performance</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
                    <div className="card flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center text-3xl">
                            📦
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold">{analytics.inventory.totalProducts}</h3>
                            <p className="text-slate-400 text-sm">Total Products</p>
                        </div>
                    </div>

                    <div className="card flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-green-500/20 flex items-center justify-center text-3xl">
                            💰
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold">₹{analytics.sales.totalRevenue.toFixed(2)}</h3>
                            <p className="text-slate-400 text-sm">Total Revenue</p>
                        </div>
                    </div>

                    <div className="card flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-secondary/20 flex items-center justify-center text-3xl">
                            🛍️
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold">{analytics.sales.totalOrders}</h3>
                            <p className="text-slate-400 text-sm">Total Orders</p>
                        </div>
                    </div>

                    <div className="card flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-yellow-500/20 flex items-center justify-center text-3xl">
                            ⚠️
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold">{analytics.inventory.lowStockProducts}</h3>
                            <p className="text-slate-400 text-sm">Low Stock Alerts</p>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
                    {/* Category Distribution */}
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-4">Category Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analytics.inventory.categoryStats}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ _id, count }) => `${_id}: ${count}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="count"
                                    nameKey="_id"
                                >
                                    {analytics.inventory.categoryStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Sales Trend */}
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-4">Sales Trend (Last 7 Days)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analytics.sales.salesTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                                <XAxis dataKey="_id" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} name="Revenue (₹)" />
                                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} name="Orders" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div className="mb-8 animate-fade-in">
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analytics.sales.topProducts}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                                <XAxis dataKey="productName" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                                <Legend />
                                <Bar dataKey="totalRevenue" fill="#6366f1" name="Revenue (₹)" />
                                <Bar dataKey="totalQuantity" fill="#8b5cf6" name="Quantity" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="animate-fade-in">
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {analytics.recentActivities.map((activity) => (
                                <div key={activity._id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                                    <div className="text-2xl">
                                        {activity.action === 'created' && '➕'}
                                        {activity.action === 'updated' && '✏️'}
                                        {activity.action === 'deleted' && '🗑️'}
                                        {activity.action === 'ordered' && '🛒'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-100">{activity.description}</p>
                                        <p className="text-slate-400 text-sm mt-1">
                                            {activity.userName} • {new Date(activity.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

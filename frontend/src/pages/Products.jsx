import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const { addToCart } = useCart();

    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports', 'Other'];

    useEffect(() => {
        fetchProducts();
    }, [search, category, sortBy, order]);

    const fetchProducts = async () => {
        try {
            const params = { search, category, sortBy, order };
            const { data } = await api.get('/products', { params });
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        alert(`${product.name} added to cart!`);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Products</h1>
                        <p className="text-slate-400">Manage your inventory</p>
                    </div>
                    <Link to="/products/new" className="btn btn-primary">
                        + Add Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="card mb-8 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input"
                        />

                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input">
                            <option value="createdAt">Sort by Date</option>
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="stock">Sort by Stock</option>
                        </select>

                        <select value={order} onChange={(e) => setOrder(e.target.value)} className="input">
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {products.map((product) => (
                        <div key={product._id} className="card">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                                    <span className={`badge ${product.status === 'active' ? 'badge-success' :
                                        product.status === 'inactive' ? 'badge-warning' :
                                            'badge-error'
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>
                                <span className="badge badge-info">{product.category}</span>
                            </div>

                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                            <div className="flex items-center justify-between mb-4 text-sm">
                                <div>
                                    <p className="text-slate-400">Price</p>
                                    <p className="text-2xl font-bold text-green-400">₹{product.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400">Stock</p>
                                    <p className={`text-xl font-semibold ${product.stock <= 10 ? 'text-red-400' : 'text-slate-100'}`}>
                                        {product.stock}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => handleAddToCart(product)} disabled={product.stock === 0} className="btn btn-primary flex-1">
                                    🛒 Add to Cart
                                </button>
                                <Link to={`/products/edit/${product._id}`} className="btn btn-secondary">
                                    ✏️
                                </Link>
                                <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <p className="text-xl">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

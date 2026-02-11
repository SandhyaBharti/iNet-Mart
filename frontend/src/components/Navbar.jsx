import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:scale-105 transition-transform">
                        <span className="text-2xl">🛒</span>
                        <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                            E-Commerce
                        </span>
                    </Link>

                    {user && (
                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                Dashboard
                            </Link>
                            <Link to="/products" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                Products
                            </Link>
                            <Link to="/orders" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                Orders
                            </Link>
                            <Link to="/activity" className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all">
                                Activity
                            </Link>
                            <Link to="/cart" className="relative text-lg text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-primary/10 transition-all">
                                <span>🛒</span>
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </Link>

                            <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
                                <span className="text-white font-medium text-sm hidden sm:block">{user.name}</span>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Activity from './pages/Activity';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="min-h-screen">
                        <Navbar />
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes */}
                            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
                            <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
                            <Route path="/products/edit/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
                            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                            <Route path="/activity" element={<PrivateRoute><Activity /></PrivateRoute>} />

                            {/* Redirect */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

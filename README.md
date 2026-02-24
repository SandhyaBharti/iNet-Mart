# Desi Delights - E-Commerce Platform

A modern full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform for Desi Delights with complete product management, shopping cart, order processing, and analytics capabilities.

## 🌟 Features

✅ **User Authentication** - JWT-based secure login/registration  
✅ **Product Management** - Full CRUD operations with image support  
✅ **Shopping Cart** - Add to cart, quantity management  
✅ **Order Processing** - Complete order management system  
✅ **Analytics Dashboard** - Interactive charts and metrics  
✅ **Activity Tracking** - Complete audit trail  
✅ **Product Images** - Custom image upload and display  
✅ **Search & Filter** - Advanced product filtering and sorting  
✅ **Responsive Design** - Modern UI with Tailwind CSS  
✅ **Indian Currency** - Prices displayed in ₹ (Rupees)  

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** & **bcrypt** - Authentication & security
- **Multer** - Image upload handling
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

### Frontend
- **React** (Vite) - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **React Context** - State management

## 📁 Project Structure

```
Desi-Delights/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── productController.js  # Product management
│   │   ├── orderController.js    # Order processing
│   │   ├── analyticsController.js # Analytics & metrics
│   │   └── activityController.js # Activity logging
│   ├── middleware/
│   │   ├── auth.js               # Authentication middleware
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   ├── Order.js              # Order schema
│   │   └── Activity.js           # Activity schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── products.js           # Product routes
│   │   ├── orders.js             # Order routes
│   │   ├── analytics.js          # Analytics routes
│   │   ├── activity.js           # Activity routes
│   │   └── upload.js            # Image upload route
│   ├── uploads/                  # Product images folder
│   │   ├── headphones.jpg        # Wireless Bluetooth Headphones
│   │   ├── tshirt.jpg           # Men's Casual T-Shirt
│   │   ├── almonds.jpg          # Organic Almonds 500g
│   │   ├── jsbook.jpg           # JavaScript: The Complete Guide
│   │   ├── bottle.jpg           # Stainless Steel Water Bottle
│   │   ├── yogamat.jpg          # Yoga Mat Anti-Slip
│   │   ├── bulb.jpg             # Smart LED Bulb
│   │   ├── shoes.jpg            # Women's Running Shoes
│   │   ├── dinner.jpg           # Ceramic Dinner Set (24 pcs)
│   │   └── protein.jpg         # Protein Powder 1kg
│   ├── utils/
│   │   └── validation.js         # Input validation
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── package.json
│   └── server.js                 # Main server file
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js          # API client with image helpers
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation component
    │   │   ├── AdminRoute.jsx    # Admin protection
    │   │   ├── PrivateRoute.jsx  # Auth protection
    │   │   ├── LoadingSpinner.jsx # Loading component
    │   │   └── ErrorMessage.jsx   # Error display
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication context
    │   │   └── CartContext.jsx   # Shopping cart context
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── Products.jsx      # Products listing
    │   │   ├── ProductForm.jsx   # Add/Edit products
    │   │   ├── Orders.jsx        # Orders management
    │   │   ├── Cart.jsx          # Shopping cart
    │   │   ├── Dashboard.jsx     # Analytics dashboard
    │   │   └── Activity.jsx      # Activity logs
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # App entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/desi-delights
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

5. Start the server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3001`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with search, filter, sort)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Image Upload
- `POST /api/upload` - Upload product image (protected)

### Orders
- `GET /api/orders` - Get all orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `POST /api/orders` - Create order (protected)
- `PUT /api/orders/:id` - Update order status (protected)
- `DELETE /api/orders/:id` - Delete order (protected)

### Analytics
- `GET /api/analytics` - Get comprehensive analytics (protected)
- `GET /api/analytics/inventory` - Get inventory insights (protected)

### Activity
- `GET /api/activity` - Get activity logs (protected)
- `GET /api/activity/user/:userId` - Get user-specific activities (protected)

## 🎯 Key Features

### 1. Product Management
- Add, edit, and delete products with images
- Real-time inventory tracking
- Category-based organization (Electronics, Clothing, Food, Books, Home, Sports, Other)
- Search and filter functionality
- Stock status indicators (Low Stock, Out of Stock)
- Custom image upload with preview
- Product images served from `/uploads` directory

### 2. Shopping Cart & Orders
- Add products to cart with quantity controls
- Cart persistence across sessions
- Order creation with customer details
- Automatic inventory deduction
- Order status tracking (pending → processing → shipped → delivered)

### 3. Analytics Dashboard
- **Inventory Metrics**: Total products, low stock alerts, category distribution
- **Sales Metrics**: Revenue, order count, trends
- **Visualizations**: Pie charts, line graphs, bar charts using Recharts
- **Recent Activity**: Real-time activity feed

### 4. Activity Tracking
- Comprehensive audit log for all user actions
- Filter by entity type (product/order/user) and action
- User attribution for all actions
- Timestamp tracking with search capabilities

### 5. User Authentication
- Secure registration and login with JWT
- Password hashing with bcrypt
- Role-based access control (User/Admin)
- Protected routes for admin functions

### 6. Image Management
- Upload product images via backend (`/api/upload`)
- Serve images from `/uploads` directory with CORS headers
- Image preview and error handling in frontend
- Support for external image URLs
- Fallback to category emojis if image fails to load

## 🗄️ Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date
}
```

### Product
```javascript
{
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  category: String,
  price: Number,
  stock: Number,
  status: String (active/inactive/out-of-stock),
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId (ref: User),
  customerName: String,
  customerEmail: String,
  items: [{
    productId: ObjectId (ref: Product),
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,
  shippingAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity
```javascript
{
  userId: ObjectId (ref: User),
  userName: String,
  entityType: String (product/order/user),
  entityId: ObjectId,
  entityName: String,
  action: String (created/updated/deleted/ordered),
  description: String,
  timestamp: Date
}
```

## 💰 Currency & Pricing

- All prices displayed in **Indian Rupees (₹)**
- Product prices stored as numbers in database
- Cart totals calculated in ₹
- Order amounts in ₹
- Consistent currency display across all pages

## 🖼️ Product Images

- Images stored in `backend/uploads/` folder
- Supported formats: JPG, PNG, WebP
- Image size limit: 2MB
- Automatic image optimization
- Fallback to category emojis if image fails to load
- Current images: 10 product-specific images
- Image URLs: `http://localhost:5000/uploads/[filename]`

## 🎨 UI/UX Features

- Modern, responsive design with Tailwind CSS
- Smooth animations and transitions
- Loading states and error handling
- Mobile-friendly interface
- Professional color scheme
- Hover effects on product cards
- Glass morphism effects
- Consistent design language

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in .env
2. Use strong JWT_SECRET
3. Configure MongoDB Atlas connection
4. Deploy to Heroku/Railway/DigitalOcean

### Frontend
1. Build production bundle:
   ```bash
   npm run build
   ```
2. Deploy to Vercel/Netlify
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository from: `https://github.com/SandhyaBharti/Desi-Delights`
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Created for Desi Delights e-commerce platform.

---

**Happy Coding! 🚀**

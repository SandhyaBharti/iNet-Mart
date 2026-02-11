# Mini E-Commerce with Inventory Analytics

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing e-commerce inventory with comprehensive analytics and visualization.

## Features

✅ **User Authentication** - JWT-based secure authentication  
✅ **Product Management** - Full CRUD operations with validation  
✅ **Order Processing** - Shopping cart and order management  
✅ **Analytics Dashboard** - Interactive charts and metrics  
✅ **Inventory Tracking** - Real-time stock monitoring  
✅ **Activity Logging** - Complete audit trail  
✅ **Search & Filter** - Advanced product filtering and sorting  
✅ **Responsive Design** - Modern UI with Tailwind CSS  

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** & **bcrypt** - Authentication & security
- **Express Validator** - Input validation

### Frontend
- **React** (Vite) - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling

## Project Structure

```
E commerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── analyticsController.js
│   │   └── activityController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── analytics.js
│   │   └── activity.js
│   ├── utils/
│   │   ├── validation.js
│   │   └── activityLogger.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── ErrorMessage.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductForm.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Cart.jsx
    │   │   └── Activity.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## Setup Instructions

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
   MONGODB_URI=mongodb://localhost:27017/ecommerce
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
   npm run dev
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

   The frontend will run on `http://localhost:3000`

## API Endpoints

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

## Features Walkthrough

### 1. User Authentication
- Secure registration and login with JWT
- Password hashing with bcrypt
- Persistent sessions with localStorage
- Protected routes with authentication middleware

### 2. Product Management
- Add, edit, and delete products
- Real-time inventory tracking
- Category-based organization
- Search and filter functionality
- Stock status indicators

### 3. Analytics Dashboard
- **Inventory Metrics**: Total products, low stock alerts, category distribution
- **Sales Metrics**: Revenue, order count, trends
- **Visualizations**: Pie charts, line graphs, bar charts
- **Recent Activity**: Real-time activity feed

### 4. Order Processing
- Shopping cart with quantity controls
- Order creation with customer details
- Automatic inventory deduction
- Order status tracking (pending → processing → shipped → delivered)

### 5. Activity Tracking
- Comprehensive audit log
- Filter by entity type and action
- User attribution for all actions
- Timestamp tracking

## Database Schema

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

## Development Timeline

- **Day 1-2**: Project setup, database schema
- **Day 3-4**: Backend API development
- **Day 5-7**: Frontend UI with Tailwind CSS
- **Day 8-9**: Analytics and charts integration
- **Day 10-11**: Shopping cart and orders
- **Day 12-13**: Testing and bug fixes
- **Day 14**: Polish and optimization
- **Day 15**: Documentation and deployment prep

## Production Deployment

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

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Author

Created as part of MERN Stack learning project.

---

**Happy Coding! 🚀**

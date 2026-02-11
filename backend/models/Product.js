import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports', 'Other']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: 0
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        min: 0,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'out-of-stock'],
        default: 'active'
    },
    imageUrl: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    // Auto-update status based on stock
    if (this.stock === 0) {
        this.status = 'out-of-stock';
    }
    next();
});

export default mongoose.model('Product', productSchema);

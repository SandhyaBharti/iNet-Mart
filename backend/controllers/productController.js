import Product from '../models/Product.js';
import { logActivity } from '../utils/activityLogger.js';

// @desc    Get all products with search, filter, and sort
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
    try {
        const { search, category, status, sortBy, order } = req.query;

        let query = {};

        // Search by name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Sort options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1; // Default: newest first
        }

        const products = await Product.find(query)
            .populate('userId', 'name email')
            .sort(sortOptions);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('userId', 'name email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, stock, imageUrl } = req.body;

        const product = await Product.create({
            userId: req.user._id,
            name,
            description,
            category,
            price,
            stock,
            imageUrl: imageUrl || ''
        });

        // Log activity
        await logActivity({
            userId: req.user._id,
            userName: req.user.name,
            entityType: 'product',
            entityId: product._id,
            entityName: product.name,
            action: 'created',
            description: `Created product: ${product.name}`
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, description, category, price, stock, status, imageUrl } = req.body;

        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.price = price !== undefined ? price : product.price;
        product.stock = stock !== undefined ? stock : product.stock;
        product.status = status || product.status;
        product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;

        const updatedProduct = await product.save();

        // Log activity
        await logActivity({
            userId: req.user._id,
            userName: req.user.name,
            entityType: 'product',
            entityId: product._id,
            entityName: product.name,
            action: 'updated',
            description: `Updated product: ${product.name}`
        });

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productName = product.name;
        await product.deleteOne();

        // Log activity
        await logActivity({
            userId: req.user._id,
            userName: req.user.name,
            entityType: 'product',
            entityId: product._id,
            entityName: productName,
            action: 'deleted',
            description: `Deleted product: ${productName}`
        });

        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

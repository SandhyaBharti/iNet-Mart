import express from 'express';
import {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { orderValidation, validate } from '../utils/validation.js';

const router = express.Router();

router.route('/')
    .get(protect, getOrders)
    .post(protect, orderValidation, validate, createOrder);

router.route('/:id')
    .get(protect, getOrder)
    .put(protect, updateOrderStatus)
    .delete(protect, deleteOrder);

export default router;

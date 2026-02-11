import express from 'express';
import { getAnalytics, getInventoryInsights } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAnalytics);
router.get('/inventory', protect, getInventoryInsights);

export default router;

import express from 'express';
import { getActivities, getUserActivities } from '../controllers/activityController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getActivities);
router.get('/user/:userId', protect, getUserActivities);

export default router;

import Activity from '../models/Activity.js';

// @desc    Get activity history
// @route   GET /api/activity
// @access  Private
export const getActivities = async (req, res) => {
    try {
        const { limit = 20, entityType, action } = req.query;

        let query = {};

        if (entityType) {
            query.entityType = entityType;
        }

        if (action) {
            query.action = action;
        }

        const activities = await Activity.find(query)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .select('-__v');

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user-specific activities
// @route   GET /api/activity/user/:userId
// @access  Private
export const getUserActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.params.userId })
            .sort({ timestamp: -1 })
            .limit(50)
            .select('-__v');

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

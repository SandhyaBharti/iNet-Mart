import Activity from '../models/Activity.js';

export const logActivity = async ({ userId, userName, entityType, entityId, entityName, action, description }) => {
    try {
        await Activity.create({
            userId,
            userName,
            entityType,
            entityId,
            entityName,
            action,
            description
        });
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

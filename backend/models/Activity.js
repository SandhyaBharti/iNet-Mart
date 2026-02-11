import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        enum: ['product', 'order', 'user'],
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    entityName: {
        type: String,
        default: ''
    },
    action: {
        type: String,
        enum: ['created', 'updated', 'deleted', 'ordered'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
activitySchema.index({ userId: 1, timestamp: -1 });
activitySchema.index({ timestamp: -1 });

export default mongoose.model('Activity', activitySchema);

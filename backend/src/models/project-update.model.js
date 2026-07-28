import mongoose from 'mongoose';

const projectUpdateSchema = new mongoose.Schema({
    // Project Information
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Update Information
    updateTitle: { type: String, required: true },
    updateDescription: { type: String, required: true },

    // Metadata
    publishedDate: { type: Date, default: Date.now },
    lastUpdatedDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Update lastUpdatedDate on every save
projectUpdateSchema.pre('save', function(next) {
    this.lastUpdatedDate = new Date();
    next();
});

export const ProjectUpdate = mongoose.model('ProjectUpdate', projectUpdateSchema);

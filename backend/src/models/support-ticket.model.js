import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
    // User Information
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userRole: { type: String, enum: ['Customer', 'Owner'], required: true },

    // Ticket Information
    subject: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

    // Ticket Status
    ticketStatus: { 
        type: String, 
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'], 
        default: 'Open' 
    },

    // Response Information
    assignedAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    adminResponse: { type: String, default: null },

    // Timeline
    createdDate: { type: Date, default: Date.now },
    lastUpdatedDate: { type: Date, default: Date.now },
    closedDate: { type: Date, default: null }
}, {
    timestamps: true
});

supportTicketSchema.pre('save', function(next) {
    this.lastUpdatedDate = new Date();
    if (this.ticketStatus === 'Closed' && !this.closedDate) {
        this.closedDate = new Date();
    }
    next();
});

export const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

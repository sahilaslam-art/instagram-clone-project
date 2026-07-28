import { z } from 'zod';

export const createTicketSchema = z.object({
    body: z.object({
        subject: z.string({ required_error: "Subject is required" }),
        category: z.string({ required_error: "Category is required" }),
        description: z.string({ required_error: "Description is required" })
    })
});

export const respondTicketSchema = z.object({
    body: z.object({
        ticketStatus: z.enum(['Open', 'In Progress', 'Resolved', 'Closed'], { required_error: "Status is required" }),
        adminResponse: z.string({ required_error: "Response is required" })
    })
});

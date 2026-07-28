import { z } from 'zod';

export const amountSchema = z.object({
    body: z.object({
        amount: z.number({ required_error: "Amount is required" }).positive("Amount must be greater than zero")
    })
});

import { z } from 'zod';

export const investSchema = z.object({
    body: z.object({
        projectId: z.string({ required_error: "Project ID is required" }),
        investmentAmount: z.number({ required_error: "Investment Amount is required" }).positive()
    })
});

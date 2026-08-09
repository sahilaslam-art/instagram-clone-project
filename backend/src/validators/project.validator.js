import { z } from 'zod';

export const createProjectSchema = z.object({
    body: z.object({
        projectTitle: z.string({ required_error: "Project Title is required" }),
        projectCategory: z.string({ required_error: "Project Category is required" }),
        projectDescription: z.string({ required_error: "Project Description is required" }),
        projectLocation: z.string({ required_error: "Project Location is required" }),
        fundingTarget: z.number({ required_error: "Funding Target is required" }).positive(),
        minimumInvestmentAmount: z.number({ required_error: "Minimum Investment Amount is required" }).positive(),
        expectedReturn: z.number({ required_error: "Expected Return is required" }).positive(),
        riskLevel: z.enum(['Low', 'Medium', 'High'], { required_error: "Risk Level is required" }),
        // Hierarchical routing fields (optional at creation, required at submit — validated in service)
        domain: z.string().optional().nullable(),
        zone: z.string().optional().nullable(),
        region: z.string().optional().nullable(),
        category: z.string().optional().nullable(),
        requiredSpecialities: z.array(z.string()).optional().default([])
    })
});

export const updateProjectSchema = z.object({
    body: createProjectSchema.shape.body.partial()
});

export const reviewProjectSchema = z.object({
    body: z.object({
        status: z.enum(['Stage', 'Live', 'Rejected'], { required_error: "Status is required" }),
        adminRemarks: z.string().optional(),
        rejectionReason: z.string().optional()
    })
});

export const createUpdateSchema = z.object({
    body: z.object({
        updateTitle: z.string({ required_error: "Update Title is required" }),
        updateDescription: z.string({ required_error: "Update Description is required" })
    })
});

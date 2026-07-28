import { z } from 'zod';

export const submitKycSchema = z.object({
    body: z.object({
        fullName: z.string({ required_error: "Full Name is required" }),
        dateOfBirth: z.string({ required_error: "Date of Birth is required" }), // expected ISO string
        gender: z.enum(['Male', 'Female', 'Other'], { required_error: "Gender is required" }),
        address: z.string({ required_error: "Address is required" }),
        bankInfo: z.object({
            accountHolderName: z.string({ required_error: "Account Holder Name is required" }),
            bankName: z.string({ required_error: "Bank Name is required" }),
            accountNumber: z.string({ required_error: "Account Number is required" }),
            ifscCode: z.string({ required_error: "IFSC Code is required" })
        }),
        documents: z.object({
            identityProof: z.string({ required_error: "Identity Proof URL is required" }),
            addressProof: z.string({ required_error: "Address Proof URL is required" }),
            bankProof: z.string({ required_error: "Bank Proof URL is required" }),
            additionalDocuments: z.array(z.string()).optional()
        })
    })
});

export const updateKycStatusSchema = z.object({
    body: z.object({
        status: z.enum(['Verified', 'Rejected'], { required_error: "Status must be Verified or Rejected" }),
        rejectionReason: z.string().optional()
    })
});

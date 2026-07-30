import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        fullName: z.string({ required_error: "Full Name is required" }).min(2, "Full Name must be at least 2 characters"),
        mobileNumber: z.string({ required_error: "Mobile Number is required" }).regex(/^\d{10}$/, "Mobile Number must be 10 digits"),
        email: z.string({ required_error: "Email Address is required" }).email("Invalid email format"),
        password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
        role: z.enum(['Customer', 'Owner', 'Feature_Admin'], { required_error: "Role is required and must be either Customer, Owner or Feature_Admin" })
    })
});

export const loginSchema = z.object({
    body: z.object({
        identifier: z.string({ required_error: "Email or Mobile Number is required" }),
        password: z.string({ required_error: "Password is required" })
    })
});

export const verifyOtpSchema = z.object({
    body: z.object({
        identifier: z.string({ required_error: "Email or Mobile Number is required" }),
        otp: z.string({ required_error: "OTP is required" }).length(6, "OTP must be 6 digits")
    })
});

export const updateProfileSchema = z.object({
    body: z.object({
        profilePhoto: z.string().url("Must be a valid URL").optional()
    })
});

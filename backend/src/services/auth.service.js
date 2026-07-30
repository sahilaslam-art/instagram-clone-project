import * as userRepository from '../repositories/user.repository.js';
import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
    const { fullName, email, mobileNumber, password, role, featureRole, domain, zone, region, category, speciality } = userData;

    // Validate role
    if (!['Customer', 'Owner', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'].includes(role)) {
        throw new Error('Invalid Role Selected');
    }

    // Check if email or mobile exists
    const existingUser = await userRepository.findByEmailOrMobile(email, mobileNumber);

    if (existingUser) {
        if (existingUser.email === email) {
            throw new Error('Email Already Exists');
        }
        if (existingUser.mobileNumber === mobileNumber) {
            throw new Error('Mobile Number Already Exists');
        }
    }

    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Create base user
    const newUser = await userRepository.create({
        fullName,
        email,
        mobileNumber,
        password: hashedPassword,
        role
    });

    // Create Profile Document based on Role
    try {
        if (role === 'Zonal_Admin') {
            await ZonalAdminProfile.create({ userId: newUser._id, featureRole, domain, zone });
        } else if (role === 'Admin') {
            await AdminProfile.create({ userId: newUser._id, featureRole, domain, zone, region });
        } else if (role === 'Sub_Admin') {
            await SubAdminProfile.create({ userId: newUser._id, featureRole, domain, zone, region, category });
        } else if (role === 'Worker') {
            await WorkerProfile.create({ userId: newUser._id, featureRole, domain, zone, region, category, speciality });
        }
    } catch (err) {
        // If profile creation fails, we should ideally rollback user creation, but for now we throw error
        await userRepository.deleteById(newUser._id); // Assuming this method exists or we can just let it fail
        throw new Error('Failed to create role profile. Please check all required fields.');
    }

    return {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role
    };
};

export const loginUser = async (identifier, password) => {
    // Identifier can be email or mobile number
    const user = await userRepository.findByEmailOrMobile(identifier, identifier);

    if (!user) {
        throw new Error('Invalid Credentials');
    }

    if (user.accountStatus === 'Inactive') {
        throw new Error('Account Inactive');
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
        throw new Error('Invalid Credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await userRepository.updateById(user._id, { lastLogin: user.lastLogin });

    // Generate token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isProfileComplete: user.isProfileComplete,
            kycStatus: user.kycStatus
        }
    };
};

export const refreshToken = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('Account Not Found');
    }
    if (user.accountStatus === 'Inactive') {
        throw new Error('Account Inactive');
    }

    // Generate fresh token for another 7 days
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isProfileComplete: user.isProfileComplete,
            kycStatus: user.kycStatus
        }
    };
};

export const verifyEmail = async (identifier, otp) => {
    // Dummy OTP logic for now, in a real app this would check against a DB/cache
    const user = await userRepository.findByEmailOrMobile(identifier, identifier);

    if (!user) {
        throw new Error('Account Not Found');
    }

    if (otp !== '123456') { // Mock verification
        throw new Error('Invalid OTP');
    }

    await userRepository.updateById(user._id, { isEmailVerified: true });
    return true;
};

export const verifyMobile = async (identifier, otp) => {
    const user = await userRepository.findByEmailOrMobile(identifier, identifier);

    if (!user) {
        throw new Error('Account Not Found');
    }

    if (otp !== '123456') { // Mock verification
        throw new Error('Invalid OTP');
    }

    await userRepository.updateById(user._id, { isMobileVerified: true });
    return true;
};

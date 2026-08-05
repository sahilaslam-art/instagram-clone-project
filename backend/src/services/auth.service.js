import * as userRepository from '../repositories/user.repository.js';
import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
    const { fullName, email, mobileNumber, password, role, featureRole, domain, zone, region, category, speciality } = userData;
    const cleanEmail = email ? email.trim().toLowerCase() : email;
    const cleanMobile = mobileNumber ? mobileNumber.trim() : mobileNumber;

    // Validate role
    if (!['Customer', 'Owner', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'].includes(role)) {
        throw new Error('Invalid Role Selected');
    }

    // Check if email or mobile exists
    const existingUser = await userRepository.findByEmailOrMobile(cleanEmail, cleanMobile);

    if (existingUser) {
        if (existingUser.email === cleanEmail) {
            throw new Error('Email Already Exists');
        }
        if (existingUser.mobileNumber === cleanMobile) {
            throw new Error('Mobile Number Already Exists');
        }
    }

    // Hash password
    const hashedPassword = await argon2.hash(password);

    // Create base user
    const newUser = await userRepository.create({
        fullName,
        email: cleanEmail,
        mobileNumber: cleanMobile,
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
    const cleanIdentifier = identifier ? identifier.trim().toLowerCase() : identifier;
    const cleanPassword = password ? password.trim() : password;
    const user = await userRepository.findByEmailOrMobile(cleanIdentifier, cleanIdentifier);

    if (!user) {
        throw new Error('Invalid Credentials');
    }

    if (user.accountStatus === 'Inactive') {
        throw new Error('Account Inactive');
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.password, cleanPassword);
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

    // Fetch admin profile details if applicable
    let profileDetails = {};
    if (['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'].includes(user.role)) {
        try {
            let profile = null;
            if (user.role === 'Zonal_Admin') profile = await ZonalAdminProfile.findOne({ userId: user._id });
            if (user.role === 'Admin') profile = await AdminProfile.findOne({ userId: user._id });
            if (user.role === 'Sub_Admin') profile = await SubAdminProfile.findOne({ userId: user._id });
            if (user.role === 'Worker') profile = await WorkerProfile.findOne({ userId: user._id });

            if (profile) {
                profileDetails = {
                    featureRole: profile.featureRole,
                    domain: profile.domain,
                    zone: profile.zone,
                    region: profile.region,
                    category: profile.category,
                    speciality: profile.speciality
                };
            }
        } catch (error) {
            console.error('Error fetching admin profile', error);
        }
    }

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isProfileComplete: user.isProfileComplete,
            kycStatus: user.kycStatus,
            ...profileDetails
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

    // Fetch admin profile details if applicable
    let profileDetails = {};
    if (['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'].includes(user.role)) {
        try {
            let profile = null;
            if (user.role === 'Zonal_Admin') profile = await ZonalAdminProfile.findOne({ userId: user._id });
            if (user.role === 'Admin') profile = await AdminProfile.findOne({ userId: user._id });
            if (user.role === 'Sub_Admin') profile = await SubAdminProfile.findOne({ userId: user._id });
            if (user.role === 'Worker') profile = await WorkerProfile.findOne({ userId: user._id });

            if (profile) {
                profileDetails = {
                    featureRole: profile.featureRole,
                    domain: profile.domain,
                    zone: profile.zone,
                    region: profile.region,
                    category: profile.category,
                    speciality: profile.speciality
                };
            }
        } catch (error) {
            console.error('Error fetching admin profile', error);
        }
    }

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isProfileComplete: user.isProfileComplete,
            kycStatus: user.kycStatus,
            ...profileDetails
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

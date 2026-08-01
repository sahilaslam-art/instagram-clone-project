import { User } from './src/models/user.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function query() {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({ role: { $in: ['Zonal_Admin', 'Admin', 'Sub_Admin'] } }).select('email role');
    console.log(users);
    process.exit(0);
}
query();

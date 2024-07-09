import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true,
            enum: ['student', 'moderator'],
            default: 'student'
        }
    },
    {
        timestamps: true
    });

export const User = mongoose.model('User', userSchema);
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type: "string",
        trim: true,
        required: [true, 'Username must not be empty'],
        unique: true,
    },
    email: {
        type: "string",
        trim: true,
        required: [true, 'Email must not be empty'],
        unique: true,
    },
    password: {
        type: "string",
        required: [true, 'Email must not be empty'],
        min: [6, 'Password must be at least 6 characters'],
        max: [12, 'Password must be less than 12 characters'],
    },
    picture: {
        type: "string",
        default: "/avatar.png",
    },
    role: {
        type: [String],
        default: ["Subcriber"],
        enum: ["Subcriber", "Instructor", "Admin"]
    },
    salt: {
        type: "string",
    }
    
}, { timestamps: true })

export default mongoose.models.Users || mongoose.model('Users', UserSchema)

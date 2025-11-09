import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password not required for Google users
        },
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    avatar: {
        type: String
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    lastLogin: Date
}, {
    timestamps: true
});

// Middleware 
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance Methods
// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await compare(candidatePassword, this.password);
};

// Method to generate verification token
userSchema.methods.generateVerificationToken = function () {
    const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
    this.verificationToken = token;
    this.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return token;
};

// Method to generate password reset token
userSchema.methods.generateResetToken = function () {
    const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
    this.resetPasswordToken = token;
    this.resetPasswordExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    return token;
};

// Remove sensitive data from JSON response
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.verificationToken;
    delete user.verificationTokenExpiry;
    delete user.resetPasswordToken;
    delete user.resetPasswordExpiry;
    return user;
};

export default model('User', userSchema);

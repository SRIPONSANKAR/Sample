const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    batch: { type: String, required: true }
});

// Create User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;

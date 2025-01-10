const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gradYear: { type: Number, required: true },
    program: { type: String, required: true },
    country: { type: String, required: true },
    jobTitle: String,
    company: String,
    linkedin: String,
    interests: String,
    volunteer: { type: String, enum: ['yes', 'no'] },
    guestLecture: { type: String, enum: ['yes', 'no'] },
    photo: String, // Path to uploaded image
    confirm: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);

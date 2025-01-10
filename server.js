const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data
app.use(bodyParser.json()); // For parsing JSON data

// Serve index.html and thankyou.html from the root of the project
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/thankyou', (req, res) => {
    res.sendFile(path.join(__dirname, 'thankyou.html'));
});

// Set up static folder for serving uploaded files
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/alumniDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose schema and model for form data
const alumniSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    email: String,
    phone: String,
    gradYear: String,
    program: String,
    country: String,
    jobTitle: String,
    company: String,
    linkedin: String,
    interests: String,
    volunteer: String,
    guestLecture: String,
    photo: String // We'll save the photo file path
});

const Alumni = mongoose.model('Alumni', alumniSchema);

// Set up Multer to handle file uploads (for the photo)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save to uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
    }
});
const upload = multer({ storage: storage });

// Handle the form POST request at /index1 and redirect after successful data submission
app.post('/index1', upload.single('photo'), async (req, res) => {
    try {
        // Log the entire request body
        console.log('Form Data Received:', req.body);
        
        // Extracting fields from the form submission
        const { name, rollno, email, phone, gradYear, program, country, jobTitle, company, linkedin, interests, volunteer, guestLecture } = req.body;
        const photo = req.file ? req.file.path : ''; // Store photo path if uploaded

        // Create new alumni record
        const newAlumni = new Alumni({
            name,
            rollno,
            email,
            phone,
            gradYear,
            program,
            country,
            jobTitle,
            company,
            linkedin,
            interests,
            volunteer,
            guestLecture,
            photo
        });

        // Save the record to the database
        await newAlumni.save();
        console.log('Data saved to database successfully.');

        // Redirect to the thank you page after successful submission
        res.redirect('/thankyou'); // Redirect to the thank you page
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

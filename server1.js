// server1.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  batch: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Route for sign-up
app.post('/signup', async (req, res) => {
  const { logname, logemail, logpass, logdept, logbatch } = req.body;

  try {
    const newUser = new User({
      name: logname,
      email: logemail,
      password: logpass,
      department: logdept,
      batch: logbatch
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Route for login
app.post('/login', async (req, res) => {
  const { logemail, logpass } = req.body;

  try {
    const user = await User.findOne({ email: logemail });

    if (!user) {
      return res.status(400).send('User not found');
    }

    if (user.password !== logpass) {
      return res.status(400).send('Invalid password');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

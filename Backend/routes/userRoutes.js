const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

// Fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await User.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' })
  }
});

// Add a new employee
router.post('/addEmployee', async (req, res) => {
  const { name, email, mobile, designation, gender, course, photo } = req.body;

  try {
    const newEmployee = new User({ name, email, mobile, designation, gender, course, photo });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee', error });
  }
});
// Sign up a new user
router.post('/signup', async (req, res) => {
  const { name, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });
  }
});

// Log in an existing user
router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
});

// Add a new employee
router.post('/addEmployee', async (req, res) => {
  const { name, email, mobile, designation, gender, course, photo } = req.body;

  try {
    const newEmployee = new User({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      photo
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee', error });
  }
});


module.exports = router;

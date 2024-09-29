const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ensure the path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/users', userRoutes);

// Listen on a port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

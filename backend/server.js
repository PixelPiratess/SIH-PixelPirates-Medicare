const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const hospitalAuthRoutes = require('./routes/hospitalAuth');
const roleCheck = require('./middleware/roleCheck');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/hospital', hospitalAuthRoutes);
app.use('/api/admin', adminRoutes);

// Protected routes
app.get('/api/dashboard', roleCheck('user'), (req, res) => {
  res.json({ message: 'User dashboard' });
});

app.get('/api/admin', roleCheck('admin'), (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
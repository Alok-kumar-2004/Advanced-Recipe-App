const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./routes/authRoutes'));
app.use('/recipe', require('./routes/recipeRoutes'));
app.use('/user', require('./routes/userRoutes'));

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'Images only!') {
    return res.status(400).json({ message: 'Images only!' });
  }
  
  if (err.message === 'File too large') {
    return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
  }

  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://varshar9483:y98WRSKaJpcLJ7LK@cluster0.jhzly11.mongodb.net/customer_connect";

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`);
});

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoute from './routes/users.js';
import eventRoute from './routes/events.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import timeslotRoute from './routes/timeslots.js';
import authRoute from './routes/auth.js';

const app = express();
const portNo = process.env.PORTNO || 8000;

// CORS config
const corsOptions = {
  origin: true,
  credentials: true
};

// Database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Database Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB Database Connection Failed");
    console.error(error.message);
  }
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('✅ API working successfully');
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/events', eventRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/timeslot', timeslotRoute);

// Start server
app.listen(portNo, () => {
  connect();
  console.log(`🚀 Server listening on port ${portNo}`);
});

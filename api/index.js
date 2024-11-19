import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import {loginCheck} from './middleware/auth.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';  // Import the connectDB function


dotenv.config();

// Database Connection
connectDB();
// // Database Connection
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() =>
//     console.log(
//       "==============Mongodb Database Connected Successfully=============="
//     )
//   )
//   .catch((err) => console.log("Database Not Connected !!!"));



// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {console.log('MongoDb is connected');})
//   .catch((err) => {
//       console.log(err);
// });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use("/api/comment", commentRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Adjust if needed

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); // Adjust if needed
});



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use(cors({
  origin: 'http://localhost:5173', // Update this with your frontend URL
}));
// app.listen(3001, () => {
//   console.log('Server is running on port 3001!');
// });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
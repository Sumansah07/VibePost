import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("==============Mongodb Database Connected Successfully==============");
  } catch (err) {
    console.error("Database Not Connected !!!", err);
  }
};

export default connectDB;

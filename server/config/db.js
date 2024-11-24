import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost/yt_test");
    console.log(connect.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;

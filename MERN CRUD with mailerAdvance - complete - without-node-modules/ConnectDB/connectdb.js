import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const options = {
      dbName: "Authentication_Data_Base",
    };

    const result = await mongoose.connect("mongodb://localhost:27017", options);
    console.log("Database connection established!");
  } catch (e) {
    console.log(e);
  }
};
export default connectDB;
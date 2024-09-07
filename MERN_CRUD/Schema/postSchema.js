import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
    trim: true,
  },
  created_by: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user_email:{
    type: String,
    required: true,
    trim: true,
  },
  user_name:{
    type: String,
    required: true,
    trim: true,
  },
  image_path:{
    type:String,
    trim:true,
  }
});

const postModel = mongoose.model("post", mySchema);

export default postModel;




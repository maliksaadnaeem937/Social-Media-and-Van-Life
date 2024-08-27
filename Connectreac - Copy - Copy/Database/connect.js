import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const options={
            dbName:'vansLife'
        }
     await mongoose.connect('mongodb://localhost:27017',options)
     console.log('connection established successfully!');

    }
    catch(e){
  console.log(e);


    }
}

export default connectDB;
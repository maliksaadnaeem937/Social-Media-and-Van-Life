

import mongoose from "mongoose";



const vansSchema=new mongoose.Schema({
    typeofVan: {type:String ,trim:true , required:true},

    imageUrl:{type:String, required:true, trim:true},

    price:{type:Number, required:true},
    name:{type:String, required:true, trim:true},
    description:{type:String, required:true,trim:true},


})
const hostVansSchema=new mongoose.Schema({
    typeofVan: {type:String ,trim:true , required:true},

    imageUrl:{type:String, required:true, trim:true},

    price:{type:Number, required:true},
    name:{type:String, required:true, trim:true},
    description:{type:String, required:true,trim:true},
    hostId:{type:String,required:true},

})

const vansModel= mongoose.model('vans',vansSchema);
const hostVansModel= mongoose.model('hostVans',hostVansSchema);


export { vansModel,hostVansModel};

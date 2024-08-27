

import express from 'express';
import { dbOperations } from '../Database/DBoperations.js';
import { hostVansClass } from '../Database/DBoperations.js';


const route=express.Router();




route.get('/getALLVans',async(req,res)=>{


try{
const data= await dbOperations.getAllVans();
console.log(data);
res.status(200).json({
    data:data
});
}
catch(e){
    console.log(e);
}


})
route.get('/getByid/:id',async(req,res)=>{
try{
   console.log(req.params.id);
const data= await dbOperations.getVan(req.params.id);
console.log(data);
res.send(data);
}
catch(e){
    console.log(e);
}


})


// it will give vans related to host  based on host id 
route.get('/host/:id',async(req,res)=>{
try{
   console.log(req.params.id);
   // passing id of host and getting all host vans
const data= await hostVansClass.getAllVans(req.params.id);
console.log(data);
res.send(data);
}
catch(e){
    console.log(e);
}


})
route.get('/host/getHostVanById/:id',async(req,res)=>{
try{
   console.log(req.params.id);
   // passing id of host van to get details
const data= await hostVansClass.getVan(req.params.id);
console.log(data);
res.send(data);
}
catch(e){
    console.log(e);
}


})




export default route;

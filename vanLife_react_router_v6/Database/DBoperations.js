import { vansModel } from "./schema.js";
import { hostVansModel } from "./schema.js";
class dbOperations{

    static insertIntoDb=async(data)=>{

        try{

            const document=new vansModel(data);
            const result =await vansModel.insertMany(data);
    
            console.log(result);
    
        }
        catch(e){
       console.log(e);

        }
      
    }

    static getAllVans=async()=>{
        try{
            const data= await vansModel.find();
            console.log(data);
            return data;
        }
        catch(e){
            console.log(e);
        }

    }
    static getVan=async(id)=>{
        try{
            const data= await vansModel.findById(id);
            return data;
        }
        catch(e){
            console.log(e);
        }

    }
}

class hostVansClass {
    static insertIntoDb=async(data)=>{

        try{

            const document=new hostVansModel(data);
            const result =await hostVansModel.insertMany(data);
    
            console.log(result);
    
        }
        catch(e){
       console.log(e);

        }
      
    }
    static getAllVans=async(id)=>{
        try{
            const data= await hostVansModel.find({hostId:id});
            console.log(data);
            return data;
        }
        catch(e){
            console.log(e);
        }

    }

    static getVan=async(id)=>{
        try{
            const data= await hostVansModel.findById(id);
            return data;
        }
        catch(e){
            console.log(e);
        }

    }

  


}
export { dbOperations,hostVansClass};
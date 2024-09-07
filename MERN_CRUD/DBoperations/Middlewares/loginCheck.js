
import responseMiddleWare from "./res.js";
import errorMiddleWare from "./error.js";
import jwt from 'jsonwebtoken';
const checkIfLoggedIn=async(req,res,next)=>{
 
  
  console.log('request recieved inside check if logged in');

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
    

      if (!token) {
        console.log("no token found!")
        return responseMiddleWare(
          302,
          "Please Login to access protected Route!",
          res
        );
      } else {
        jwt.verify(token, "your-secret-key", (err, decoded) => {
          if (err) {
            console.log("jwt verification failed")
            return responseMiddleWare(
              302,
              "Please Login to access protected Route!",
              res
            );
          } else {
           
          req.user=decoded;
        
          console.log('verification success Moving to next middle ware from check if logged in')
         
           return next();
          }
        
        });
        return;
      }
    }
    return responseMiddleWare(
      302,
      "Please Login to access protected Route!",
      res
    );
  };


export default checkIfLoggedIn;
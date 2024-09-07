import multer from "multer";
import path from "path";
import fs from "fs";


const dir = path.join(process.cwd(), "images/");
console.log(dir);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    console.log('inside multer function', file);
    
 
    cb(null, dir);
  },
  filename: function (req, file, cb) {
  
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

export default upload;

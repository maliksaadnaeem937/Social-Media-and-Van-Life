
import multer from "multer";
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('inside multer functtion',file)
      const dir = path.join(process.cwd(), "images/");
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

  export default upload;
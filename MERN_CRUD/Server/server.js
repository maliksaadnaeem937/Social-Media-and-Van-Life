
import express from 'express';

import path from 'path';


import router from '../Routes/routes.js';

import cors from 'cors';

const app = express();


app.use(cors());

const PORT=process.env.PORT||8000;


const HOST='localhost';

app.use('/static',express.static(path.join(process.cwd(), 'images')));

app.use(express.json());


app.use('/api',router);


app.listen(PORT,HOST,()=>{

    console.log(`server is running at http://${HOST}:${PORT}`)
})

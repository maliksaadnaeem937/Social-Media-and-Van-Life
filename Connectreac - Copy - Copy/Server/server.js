import express from 'express';
import cors from 'cors';
import route from '../Routes/routes.js';
const app=express();
app.use(cors());

const PORT=process.env.PORT||3000;

const HOST='localhost';


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api',route);




app.listen(PORT,HOST,()=>{

    console.log(`server running at http://${HOST}:${PORT}`)
})
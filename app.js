require('dotenv').config();
const dbConnect =require('./config/dbconnect')
const userRouter = require('./routes/userrouter')
const notesRouter =require('./routes/notesrouter')

const express = require('express');
const app =express();
const cors =require('cors')

const port = 3000;
const DATABASE_URL="mongodb://127.0.0.1:27017";

app.use(cors());
app.use(express.json());


app.use('/users',userRouter);
app.use('/notes',notesRouter);

dbConnect(DATABASE_URL);





app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})
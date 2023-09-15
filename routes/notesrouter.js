const express = require('express');
const userAuth = require('../middlewares/auth');
const notesRouter=express.Router();

notesRouter.get('/',userAuth,(req,res)=>{
    res.status(201).json({"message":"authenticated",
                           "id":req.userId })

});
notesRouter.post('/',userAuth,(req,res)=>{

});

module.exports=notesRouter;
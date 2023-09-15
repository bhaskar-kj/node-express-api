const mongoose = require("mongoose");
const notesScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
        
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        
    }
  });

  module.exports = mongoose.model("notes", notesScheme);
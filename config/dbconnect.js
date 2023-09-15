const mongoose = require("mongoose");

const dbConnect = async (DATABASE_URL) => {
  try {
    const DB_Options = {
      dbName: "notesdb",
    };
    await mongoose.connect(DATABASE_URL, DB_Options);
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbConnect;

const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }
    const existinguser = await userModel.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({
      username: username,
      email: email,
      password: hashedpassword,
    });
    const CreatedUser = await newuser.save();
    const token = jwt.sign(
      { email: CreatedUser.email, id: CreatedUser._id },
      "feiwedmrvdwb",
      { expiresIn: "20m" }
    );
    res.status(201).json({ message: "User Created", token: token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const signin = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "feiwedmrvdwb",
      { expiresIn: "20m" }
    );
    res.status(200).json({
      message: "Login Successfull",
      token: token,
    });
  } catch (err) {
    
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signin, signup };

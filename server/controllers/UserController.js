import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";



const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    return token;
}

//POST /api/users/register
export const registerUser = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
      return res.status(400).json({ message : "All fields are required"});
    }
    
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ message : "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password : hashedPassword
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    newUser.password = undefined; //hide password


    res.status(201).json({ message : "User registered successfully" , token, existingUser : newUser });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server Error" });
  }


}


//POST /api/users/login
export const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message : "All fields are required"});
    }
    
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message : "Invalid email or password"});
        }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({ message : "Invalid email or password"});
    }

    const token = generateToken(user._id);
    user.password = undefined; //hide password

    res.status(200).json({ message : "User logged in successfully" , token, user });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

//GET /api/users/data
export const getUserData = async (req, res) => {
    try{    
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({ message : "User not found"});
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error in getUserData:", error);
        res.status(500).json({ message: "Server Error" });
    }
}


//Controlles for getting user resume data and updating resume data can be added here in future

//GET /api/users/resume

export const getUserResume = async (req, res) => {
    try{    
        const userId = req.userId;
        const resumes = await Resume.find({ userId });
        
        if(resumes.length === 0){
            return res.status(404).json({ message : "No resume data found for user"});
        }
        return res.status(200).json({ resumes });
    }
    catch (error) {
        console.error("Error in getUserResume:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
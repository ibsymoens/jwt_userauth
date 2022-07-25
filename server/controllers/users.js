import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Sign In
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if the user exists in the database
        const existingUser = await User.findOne({ email });        
        if(!existingUser) return res.status(400).json({ message: "User doesn't exists."});

        // check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        console.log(err.message);
    }
};

// Sign Up
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    try {
        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists." });

        // check if the password is match
        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
        
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (err) {
        console.log(err.message);
    }
};
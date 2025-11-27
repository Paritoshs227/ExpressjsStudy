import express from 'express';
const router = express.Router();
import users from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await users.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new users({ username, email, password: hashedPassword });
            const savedUser = await newUser.save();
            res.json(savedUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/login', async (req, res) => {
    
    const { username, password } = req.body;
   
    try {
        const user = await users.findOne({ username });       
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            } else {               
                const token = jwt.sign(
                    { userId: user._id, username: user.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({ token });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.post('/logout', () => {
    res.json({ message: 'Logout successful' });

});

export default router;
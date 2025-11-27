import jwt from 'jsonwebtoken';
import users from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const auth= async (req, res, next) => {
    try {
      
        const bearerHeader = req.headers['authorization'];
        // console.log("bearer header",bearerHeader);
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            console.log("bearer ",bearer);
            const bearerToken = bearer[1];  
            console.log("bearerToken ",bearerToken);
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
            console.log("decoded ",decoded);
            const user = await users.findById(decoded.userId);
            console.log("user ",user);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            console.log("req ",req.user);
            next();
        } else {
            res.status(401).json({ message: 'Unauthorizeddddd' });
        }
    } catch (error) {
        res.status(403).json({ message: 'Invalid Or Token Expired' });
    
    }
};
export default auth;
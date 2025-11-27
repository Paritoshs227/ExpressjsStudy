import express from 'express';
import { connectDB } from './config/database.js';   
import studentRoutes from './routes/students.routes.js';
import auth from './middilware/auth.js';
import usersRoutes from './routes/users.route.js';
import multer from 'multer';    
import cors from 'cors';
import path from 'path';
import ratelimiter from 'express-rate-limit';
import helmet from 'helmet';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT ;


const limiter = ratelimiter({
    windowMs: 1000 * 60 * 15, // 15 minutes
    max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)  
    message:"too many request from this ip, please try again after 15 minutes"  
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());  
app.use(helmet());  
connectDB();
app.use(limiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  

app.use('/api/users', usersRoutes);
app.use(auth);
app.use('/api/students', studentRoutes);
// parse application/json



app.get('/', (req, res) => {
    
    res.send(`<h1>Hello Root!</h1>`)
});


app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).send(`image upload error: ${err.message} and ${err.code}`);
    }
    else if (err) {
        // An unknown error occurred when uploading.
        return res.status(500).send(`Something went wrong: ${err.message}`);
    }
    next();
});
app.listen(PORT, () => {
    console.log(`Server running on portss ${PORT}`);
});
import express from 'express';
import contactRoutes from './routes/contact.routes.js';
import { connectDB } from './config/database.js';

const app = express();
const port = process.env.PORT ;

// Connect to the database
connectDB();   




app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
// Middleware and view engine setup 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // to parse form data
app.use(express.static('public')); // to serve static files from 'public' directory
app.use('/', contactRoutes); // Use contact routes


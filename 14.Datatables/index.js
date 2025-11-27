import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/students.model.js';
const app = express();




app.use(express.json());
app.use(express.static('public'));
app.use(cors());  

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json({data:students});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
mongoose.connect("mongodb://127.0.0.1:27017/students-crud").then(() => { console.log("Connected to MongoDB") }).catch((err) => { console.error("Failed to connect to MongoDB", err) });
app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});
import express from 'express';
const router = express.Router();
import Student from '../models/students.model.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
   
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname && file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'), false);
        }



};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }
});

//get all students
router.get('/', async (req, res) => {
    try {

        const search =req.query.search || ''

        const query={
            $or:[
                {firstname:  {$regex: search,$options: 'i'}},
                {lastname: {$regex: search,$options: 'i'}}
            ]

        }
            
        
        const students = await Student.find(query);
        res.json(students);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// create new student
router.post('/', upload.single('profilePicture'), async (req, res) => {
    try {
       // const newstudent = await Student.create(req.body);
       const student = new Student(req.body);
       if (req.file) {
        student.profilePicture = req.file.filename;
    }
    const newstudent = await student.save();
        
        res.status(201).json({ flag: true, newstudent });

    } catch (error) {
        res.status(400).json({ flag: false, message: error.message });
    }
});

// update student by ID
router.put('/:id',upload.single('profilePicture'), async (req, res) => {
    try {
        const existingstudent = await Student.findById(req.params.id);
        if (!existingstudent) {
              if (req.file) {
                const filepath = path.join('./uploads', req.file.filename);
                fs.unlink(filepath, (err) => {
                    if (err) {
                        console.error('Error deleting mistaken uploaded profile picture:', err);
                    }
                });
              }

            return res.status(404).json({ message: 'Student not found' });
        }
        if (req.file) {
            if (existingstudent.profilePicture) {
                const oldimgpath = path.join('./uploads', existingstudent.profilePicture);
                fs.unlink(oldimgpath, (err) => {
                    if (err) {
                        console.error('Error deleting old profile picture:', err);
                    }
                });
            }
            req.body.profilePicture = req.file.filename;
        } 

        const updatedstudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // if (!updatedstudent) {
        //     return res.status(404).json({ message: 'Student not found' });
        // }
        res.json(updatedstudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// delete student by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedstudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedstudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Delete profile picture from uploads folder
        if (deletedstudent.profilePicture) {
            const filePath = path.join('./uploads', deletedstudent.profilePicture);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting profile picture:', err);
                }
            });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
import express from 'express';
import multer from 'multer';
import path from 'path';
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


    if (file.fieldname === 'file') {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname && file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'), false);
        }

    } else if (file.fieldname === 'file2') {
        const allowedTypes = /pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname && file.mimetype.startsWith('application/pdf')) {
            cb(null, true);
        } else {
            cb(new Error('Only pdf are allowed'), false);
        }

    } else {
 cb(new Error("unknown field"), false);
    }

};

const upload = multer(
    {
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 1 * 1024 * 1024 }
    }); // 3MB limit

app.get('/', (req, res) => {
    res.render('myform');
});
// app.post('/saveform', upload.single('file'), (req, res) => {
//     if (!req.file || req.file.size === 0) {
//         return res.render('myform', { errorMsg: 'Please upload a file.' });
//     }
//     //res.send(req.file);
//      res.render('myform', { successMsg: 'File uploaded successfully!' });
// });

// app.post('/saveform', upload.array('file',3), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         return res.render('myform', { errorMsg: 'Please upload a file.' });
//     }
//     res.send(req.files);
//     // res.render('myform', { successMsg: 'File uploaded successfully!' });
// });
app.post('/saveform', upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'file2', maxCount: 2 }
]), (req, res) => {
    // if (!req.files || req.files.length === 0) {
    //     return res.render('myform', { errorMsg: 'Please upload a file.' });
    // }
    res.send(req.files);
    // res.render('myform', { successMsg: 'File uploaded successfully!' });
});
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            // return res.status(400).send(`Multer Error: Too many files uploaded. Maximum allowed is 3.`);
            return res.status(400).render('myform', { errorMsg: `Multer Error: Too many files uploaded. Maximum allowed is 3.` });
        }
        // return res.status(400).send(`Multer Error: ${error.message}`);
        return res.status(400).render('myform', { errorMsg: `Multer Error: ${error.message}` });
    } else if (error) {
        // return res.status(500).send(` Something went wrong: ${error.message}`);
        return res.status(400).render('myform', { errorMsg: ` Something went wrong: ${error.message}` });
    }
    next();
});
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
import express from 'express';
import { body, validationResult } from 'express-validator';
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateForm = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .isAlpha().withMessage("Username must contain only alphabetic characters")
        .custom((value => {
            if (value.toLowerCase() === "admin") {
                throw new Error("Username 'admin' is not allowed");
            }
            return true;
        }))
    // .customSanitizer((value) => value.toLowerCase())
    ,
    body("email").isEmail().withMessage("Invalid email address")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6, max: 10 }).withMessage("Password must be between 6 and 10    characters long")
        .isStrongPassword().withMessage("Password must include uppercase, lowercase, number, and symbol"),
    body("age")
        .isInt({ min: 18, max: 120 }).withMessage("Age must be a number between 18 and 120"),
    body("city")
        .notEmpty().withMessage("City is required")
        .isIn(["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Pune", "Ahmedabad", "Surat"])
        .withMessage("Invalid city selected")
]

app.get('/', (req, res) => {
    res.render('myform');
});
app.post('/saveform', validateForm, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('myform', { errors: errors.array(), old: req.body });
    }
    // success path
    return res.send(req.body);
    //res.render('myform', { errors:errors.array() });
});
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
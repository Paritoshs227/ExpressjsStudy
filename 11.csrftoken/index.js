import express from 'express';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
const app = express();

const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());


// app.use(csrfProtection);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Home Page with CSRF Token');
});

app.get('/form', csrfProtection, (req, res) => {
    res.render('myform', { csrfToken: req.csrfToken() });
});


app.post('/submit', csrfProtection, (req, res) => {
res.send(req.body);
});





app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
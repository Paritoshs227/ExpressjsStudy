import express from 'express';
const app = express();
const port = 3001;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // to parse form data
app.set('views', './myViews'); // if views are stored in 'myViews' directory
app.use(express.static('public')); // to serve static files from 'public' directory
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
   res.send('Hello Page');
})

app.get('/about', (req, res) => {
   // let fruits=["apple", "mango","banana"]
   let users = [
      { name: "jhon", age: 35, city: "delhi" },
      { name: "ram", age: 25, city: "mumbai" },
      { name: "shyam", age: 32, city: "kolkata" },
      { name: "mohan", age: 45, city: "chennai" },

   ]
   res.render('about', { title: 'About Page', message: "Welcome to the About Page!", items: users });
})
app.get('/form', (req, res) => {

   res.render('form', { message: null });
})
app.post('/submit', (req, res) => {
   const val = req.body.username;
   //res.send(`hi ${val}, your form is submitted successfully `);
   const message = `hi ${val}, your form is submitted successfully `;
   res.render('form', { message: message });
})
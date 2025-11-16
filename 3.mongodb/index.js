import express from 'express';
import mongoose from 'mongoose';
import Contact from './models/contact.models.js';
const app = express();
const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/contact-crud').then(() => { console.log("Connected to MongoDB") }).catch((err) => { console.error("Failed to connect to MongoDB", err) });


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
// Middleware and view engine setup 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // to parse form data
app.use(express.static('public')); // to serve static files from 'public' directory

// Route definitions
app.get('/', async (req, res) => {
   const contacts = await Contact.find();
   // res.json(contacts);
   res.render('home', { contacts: contacts });
});
app.get('/show-contact/:id', async (req, res) => {
   const contact = await Contact.findById(req.params.id); // Find by ID method
  // const contact = await Contact.findOne({_id: req.params.id}); // Alternative way to find by ID

   // res.json(contact);
   res.render('show-contact', { contact: contact });
});
app.get('/add-contact', (req, res) => {
   res.render('add-contact', { title: 'Add Contact Page' });
});
app.post('/add-contact', async (req, res) => {
   // res.send(req.body);
   //  await Contact.insertOne({
   //    firstName: req.body.firstName,
   //    lastName: req.body.lastName,
   //    email: req.body.email,
   //    mobile: req.body.mobile,
   //    address: req.body.address
   //  });
      await Contact.create(req.body);
   res.redirect('/');
});
app.get('/update-contact/:id', async (req, res) => {
      const contact = await Contact.findById(req.params.id);
   res.render('update-contact', { title: 'Update Contact Page', contact: contact });
});
app.post('/update-contact/:id', async (req, res) => {
   const { firstName, lastName, email, mobile, address } = req.body; // Destructuring assignment
   // await Contact.findByIdAndUpdate(req.params.id, req.body); // Alternative way
    await Contact.findByIdAndUpdate(req.params.id, { firstName, lastName, email, mobile, address }); // Update specific fields
    res.redirect('/');
});
app.get('/delete-contact/:id', async (req, res) => {
   await Contact.findByIdAndDelete(req.params.id);
   res.redirect('/');
});
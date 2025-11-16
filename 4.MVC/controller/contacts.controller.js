import mongoose from 'mongoose';
import Contact from '../models/contact.models.js';

export const getAllContacts = async (req, res) => {

   try {
      const contacts = await Contact.find();

      if (!contacts) {
         return res.render('404', { message: 'Contacts Not Found' });
      }
      return res.render('home', { contacts: contacts });

   } catch (error) {
      return res.render('500', { message: error });
   }
   // const contacts = await Contact.find();
   // // res.json(contacts);
   // return res.render('home', { contacts: contacts });
}
export const getPaginatedContacts = async (req, res) => {


   try {
      const { page = 1, limit = 3 } = req.query;
      const options = {
         page: parseInt(page),
         limit: parseInt(limit)
      }
      const result = await Contact.paginate({}, options);
      // res.send(result);
      res.render('pagination', {
         totalDocs: result.totalDocs,
         limit: result.limit,
         totalPages: result.totalPages,
         currPage: result.page,
         counter: result.pagingCounter,
         hasPrevPage: result.hasPrevPage,
         hasNextPage: result.hasNextPage,
         prevPage: result.prevPage,
         nextPage: result.nextPage,
         contacts: result.docs
      });

   } catch (error) {
      return res.render('500', { message: error });
   }

}

export const getContactsById = async (req, res) => {
   const id = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.render('404', { message: 'Invalid Contact ID' });
   }
   try {
      const contact = await Contact.findById(id); // Find by ID method
      // const contact = await Contact.findOne({_id: id}); // Alternative way to find by ID

      // res.json(contact);
      if (!contact) {
         return res.render('404', { message: 'Contact Not Found' });
      }
      return res.render('show-contact', { contact: contact });

   } catch (error) {
      return res.render('500', { message: error });
   }

}
export const renderAddContactForm = (req, res) => {
   return res.render('add-contact');
}
export const addNewContact = async (req, res) => {


   try {
      await Contact.create(req.body);
      return res.redirect('/');

   } catch (error) {
      return res.render('500', { message: error });
   }
   // res.send(req.body);
   //  await Contact.insertOne({
   //    firstName: req.body.firstName,
   //    lastName: req.body.lastName,
   //    email: req.body.email,
   //    mobile: req.body.mobile,
   //    address: req.body.address
   //  });
   // await Contact.create(req.body);
   // return res.redirect('/');
}
export const renderUpdateContactForm = async (req, res) => {
   const id = req.params.id;

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.render('404', { message: 'Invalid Contact ID' });
   }
   try {
      const contact = await Contact.findById(id);
      if (!contact) {
         return res.render('404', { message: 'Contact Not Found' });
      }
      return res.render('update-contact', { contact: contact });

   } catch (error) {
      return res.render('500', { message: error });
   }

}

export const updateContact = async (req, res) => {
   const id = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.render('404', { message: 'Invalid Contact ID' });
   }

   try {
      const contact = await Contact.findByIdAndUpdate(id, req.body);
      if (!contact) {
         return res.render('404', { message: 'Contact Not Found' });
      }
      return res.redirect('/');

   } catch (error) {
      return res.render('500', { message: error });
   }


   //const { firstName, lastName, email, mobile, address } = req.body; // Destructuring assignment
   //await Contact.findByIdAndUpdate(req.params.id, req.body); // Alternative way
   // await Contact.findByIdAndUpdate(req.params.id, { firstName, lastName, email, mobile, address }); // Update specific fields
   // return res.redirect('/');


};
export const deleteContact = async (req, res) => {
   const id = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.render('404', { message: 'Invalid Contact ID' });
   }

   try {
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
         return res.render('404', { message: 'Contact Not Found' });
      }
      return res.redirect('/');

   } catch (error) {
      return res.render('500', { message: error });
   }
   // await Contact.findByIdAndDelete(req.params.id);
   // return res.redirect('/');
}
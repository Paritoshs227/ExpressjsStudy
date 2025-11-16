import express from 'express';
import {
    getAllContacts,
    getContactsById,
    renderAddContactForm,
    addNewContact,
    renderUpdateContactForm,
    updateContact,
    deleteContact,
    getPaginatedContacts
} from '../controller/contacts.controller.js';
const router = express.Router();


// Route definitions
router.get('/', getAllContacts);
router.get('/paginate', getPaginatedContacts);
router.get('/show-contact/:id', getContactsById);
router.get('/add-contact', renderAddContactForm);
router.post('/add-contact', addNewContact);
router.get('/update-contact/:id', renderUpdateContactForm);
router.post('/update-contact/:id', updateContact);
router.get('/delete-contact/:id', deleteContact);

export default router;
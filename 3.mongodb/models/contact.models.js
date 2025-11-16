import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String,  unique: true },
    mobile: { type: String},
    address: { type: String }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact; 
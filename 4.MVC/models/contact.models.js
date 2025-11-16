import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String,  unique: true },
    mobile: { type: String},
    address: { type: String }
});

contactSchema.plugin(mongoosePaginate)
const Contact = mongoose.model('Contact', contactSchema);

export default Contact; 
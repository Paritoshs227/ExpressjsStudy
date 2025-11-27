import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({ 
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    profilePicture: { type: String },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
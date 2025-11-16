const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
    brand: String,
    name: String,
});
module.exports= productsModel = mongoose.model('product', productsSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
        name:{type:String,required:true},
        email:{type:String,required:true, unique:true},
        message:{type:String, required:true},
        
})


module.exports = mongoose.model('ContactUs', contactUsSchema)
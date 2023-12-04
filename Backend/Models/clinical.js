const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicalSchema = new Schema({
        name:{type:String,required:true},
        email:{type:String,required:true, unique:true},
        address:{type:String, required:true},
        nTel:{type:String,required:true}
})


module.exports = mongoose.model('Clinical', clinicalSchema)
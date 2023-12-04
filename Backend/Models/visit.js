const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const visitSchema = new Schema({
    dateOfVisit :{type : String, required : true},
    visitor:{ type : mongoose.Types.ObjectId, required:true, ref : 'User' },
    visitorName : {type : String , required : true},
    clinicalVisited:{ type : mongoose.Types.ObjectId, required:true, ref : 'Clinical' },
    clinicalName : {type : String , required : true},
    
})

module.exports = mongoose.model('Visit', visitSchema)
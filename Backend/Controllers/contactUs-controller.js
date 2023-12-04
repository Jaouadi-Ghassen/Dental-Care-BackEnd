const HttpError = require('../Models/http-errors');
const uuid = require('uuid')
const {validationResult} = require('express-validator')

const ContactUs = require('../Models/contactUs')

const addContactUs = async (req,res,next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check data.', 422))

    }
    const {name, email , message } = req.body
    
    const newcontactUs = new ContactUs ({
        name,
        email,
        message
    }  )

    try{await newcontactUs.save();}catch(err){const erreur = new HttpError("SignUp has failed, please try again",500);console.log(err.message);return next(erreur)}
    res.status(201).json({Message:newcontactUs})

}

const getAllContactUS = async (req,res,next) =>{
    let texts
    try{texts = await ContactUs.find();}catch(error){ return next(new HttpError("fetching contact us failed",500))} 
     


    res.status(200).json({users: users.map(u=>u.toObject({getters:true}))})
}

const deleteContactUs = async(req,res,next) =>{
    
    const textId = req.params.cuid
    
    let text 
    try{
        text = await ContactUs.findById(textId)
   } catch(err){
    const error = new HttpError('Something went wrong, we could not find a text with the provided Id ', 500)
    return next(error) 
   }


   try{
    await ContactUs.deleteOne( {_id: textId})
   } catch(err){
    const error = new HttpError('Something went wrong, we could not delete the text with the provided Id ', 500)
    return next(error) 
   }

    res.status(200).json({message: 'Deleted contact us message'})

}


exports.deleteContactUs = deleteContactUs
exports.getAllContactUS = getAllContactUS
exports.addContactUs = addContactUs
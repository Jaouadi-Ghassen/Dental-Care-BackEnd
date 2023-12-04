const HttpError = require('../Models/http-errors');
const uuid = require('uuid')
const {validationResult} = require('express-validator')

const Visit = require('../Models/visit')
const User = require('../Models/user')
const Clinical = require('../Models/clinical')

const addVisit = async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check data.', 422))

    }

    const {userId,clinicalId} = req.body

    // Find User with the provided ID
    let currentUser
    try{ currentUser =await User.findById(userId)}
    catch(err){const erreur = new HttpError("getting user is failed, please try again",500);return next(erreur)}
    if(!currentUser){
        
        const error =  new HttpError("Could not find a user for the provided id", 404);
        return next(error)
    }

    // Find Clinical with the provided ID
    let currentClinical
    try{ currentClinical =await Clinical.findById(clinicalId)}
    catch(err){const erreur = new HttpError("getting clinical is failed, please try again",500);return next(erreur)}
    if(!currentClinical){   
        const error =  new HttpError("Could not find a clinical for the provided id", 404);
        return next(error)
    }



    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    date = date.toDateString()
    hours = hours.toString()
    minutes = minutes.toString()
    const createdVisit = new Visit({
        dateOfVisit: date+ ' ' + hours+':'+minutes,
        visitor:userId,
        visitorName: currentUser.fName + ' ' + currentUser.lName,
        clinicalVisited:clinicalId,
        clinicalName: currentClinical.name

    })

    try{await createdVisit.save();}catch(err){const erreur = new HttpError("Adding visit has failed, please try again",500);console.log(err.message);return next(erreur)}
    res.status(201).json({Visit : createdVisit})

} 

const getVisits = async(req,res,next) => {
    let visits
    try{visits = await Visit.find();}catch(error){ return next(new HttpError("fetching visits failed",500))} 
     


    res.status(200).json({visits: visits.map(v=>v.toObject({getters:true}))})

}

const deleteVisit = async(req,res,next) =>{
    const visitId = req.parms.vid

    let visit
    try{
        visit = await Visit.findById(visitId)
   } catch(err){
    const error = new HttpError('Something went wrong, we could not find a text with the provided Id ', 500)
    return next(error) 
   }


   try{
    await Visit.deleteOne( {_id: visitId})
   } catch(err){
    const error = new HttpError('Something went wrong, we could not delete the text with the provided Id ', 500)
    return next(error) 
   }

    res.status(200).json({message: 'Deleted visit message'})
}


exports.deleteVisit = deleteVisit
exports.getVisits = getVisits
exports.addVisit = addVisit
const HttpError = require('../Models/http-errors');
const uuid = require('uuid')
const {validationResult} = require('express-validator')

const Clinical = require('../Models/clinical')




const getClinicals = async(req,res,next) =>{
    


    let clinicals 
    try{ clinicals = await Clinical.find({});}catch(error){ return next(new HttpError("fetching users failed",500))} 
     


    res.status(200).json({clinicals: clinicals.map(c=>c.toObject({getters:true}))})
    }

const getClinicalById = async (req,res,next) =>{
    const ClinicalId = req.params.cid;
    let clinical
    try{ clinical =await Clinical.findById(ClinicalId)}
    catch(err){const erreur = new HttpError("getting clinical is failed, please try again",500);return next(erreur)}
    if ( !clinical) {
        return next( new HttpError('Could not find a clinical for the provided id.', 404))
    }
    res.json({Clinical : clinical.toObject({getters:true}) })
}

const addClinical = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check data.', 422)

    }
    const {name ,email ,address, nTel  } = req.body;
    let existingClinical
    try{existingClinical = await Clinical.findOne({name:name})}
    catch(error){const erreur = new HttpError("sorry check addClinical api ",500);return next(erreur)}
     
    if (existingClinical) {
        return next( new HttpError("there's already existing Clinical with the suggested name", 422))
    }

    

    const createdClinical = new Clinical({
       
        name,
        email,
        address,
        nTel
    })
   
    
    
    try{await createdClinical.save();}catch(err){const erreur = new HttpError("Adding clinical has failed, please try again",500);console.log(err.message);return next(erreur)}
    res.status(201).json({Clinical: createdClinical})



}


const updateClinical = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check data.', 422)

    }
    const {name ,address, nTel  } = req.body;
    const clinicalId = req.params.cid;

    let updatedClinical
   try{
        updatedClinical = await Clinical.findById(clinicalId)
   } catch(err){
    const error = new HttpError('Something went wrong, we could not update the clinical ', 500)
    return next(error) 
   }
    
    updatedClinical.name = name
    updatedClinical.address = address
    updatedClinical.nTel = nTel
    
    try{await updatedClinical.save();}catch(err){const erreur = new HttpError("Updating clinical has failed, please try again",500);console.log(err.message);return next(erreur)}
    res.status(201).json({Clinical: updatedClinical.toObject({getters:true})})
}


const deleteClinical = async (req,res,next) =>{
    const clinicalId = req.params.uid;
    let clinical
   try{
        clinical = await Clinical.findById(clinicalId)
   } catch(err){
    const error = new HttpError('Something went wrong, we could not delete the clinical', 500)
    return next(error) 
   }

   try{
    await Clinical.deleteOne( {_id: clinicalId})
   } catch(err){
    const error = new HttpError('Something went wrong, we could not delete the clinical ', 500)
    return next(error) 
   }

    res.status(200).json({message: 'Deleted Clinical'})
}

exports.getClinicals = getClinicals
exports.deleteClinical = deleteClinical
exports.getClinicalById = getClinicalById
exports.addClinical = addClinical
exports.updateClinical = updateClinical

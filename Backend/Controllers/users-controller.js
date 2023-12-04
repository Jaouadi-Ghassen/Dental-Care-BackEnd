const HttpError = require('../Models/http-errors');
const uuid = require('uuid')
const {validationResult} = require('express-validator')


const User = require('../Models/user')



const getUsers = async(req,res,next)=>{ 

    let users
    try{users = await User.find({},'-password');}catch(error){ return next(new HttpError("fetching users failed",500))} 
     


    res.status(200).json({users: users.map(u=>u.toObject({getters:true}))})
}


const signUp = async(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check data.', 422))

    }
    const {firstName , lastName, address , email , password, confirmPassword, tel  } = req.body;

    let existingUser
    try{existingUser = await User.findOne({email:email})}
    catch(error){const erreur = new HttpError("couldn't find user with privided email,please try later",500);return next(erreur)}
     
    if (existingUser) {
        return next( new HttpError("there's already existing user with this email", 422))
    }
    

    const createdUser = new User({
        firstName , 
        lastName ,
        address, 
        email , 
        password, 
        confirmPassword,
        Tel  
    })


   
    

    try{await createdUser.save();}catch(err){const erreur = new HttpError("SignUp has failed, please try again",500);console.log(err.message);return next(erreur)}
    res.status(201).json({User: createdUser})



}

const logIn = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors){
        return next( new HttpError("Invalid inputs passed, please check your data", 422))
    }
  
    const email = req.body.email;
    const password = req.body.password;
    
    let existingUser
    try{existingUser = await User.findOne({email:email})}
    catch(error){const erreur = new HttpError("Login in failed ,please try later",500);console.log(error.message);return next(erreur)}
     
   
    if(!existingUser ){
        return next(new HttpError("Invalid email , please check your email",401))
    }
    if(existingUser.password !==password ){
        return next(new HttpError("Invalid password , please check your password",401))
    }

    res.json({message:"loggid in"})

}

const getUserById = async (req,res,next) =>{
    const userid = req.params.uid
    let currentUser
    try{ currentUser =await User.findById(userid)}
    catch(err){const erreur = new HttpError("getting user is failed, please try again",500);return next(erreur)}
    
    
    
    if(!currentUser){
        
        const error =  new HttpError("Could not find a user for the provided id", 404);
        return next(error)
    }
    res.json({User : currentUser.toObject({getters:true}) })
}

const updateUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check data.', 422)

    }
    const {fName , lName , email , password, nTel  } = req.body;
    const userId = req.params.uid;

   let updatedUser
   try{
        updateUser = await User.findById(userId)
   } catch(err){
    const error = new HttpError('Something went wrong, we could not update the user ', 500)
    return next(error) 
   }

    updatedUser.fName = fName
    updatedUser.lName = lName
    updatedUser.email = email
    updatedUser.password = password
    updatedUser.nTel = nTel
    
    try{
        await updateUser.save()
    }catch(err){
        const error = new HttpError('Something went wrong, we could not update the user ', 500)
    return next(error) 
    }

    res.status(200).json({User: updatedUser.toObject({getters:true})})
}


const deleteUser = async (req,res,next) =>{
    const userId = req.params.uid;
    
    let user
   try{
        user = await User.findById(userId)
   } catch(err){
    const error = new HttpError('Something went wrong, we could not find a user with the provided Id ', 500)
    return next(error) 
   }


   try{
    await User.deleteOne( {_id: userId})
   } catch(err){
    const error = new HttpError('Something went wrong, we could not delete the user ', 500)
    return next(error) 
   }

    res.status(200).json({message: 'Deleted user'})
}

exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getUserById = getUserById;
exports.signUp = signUp;
exports.logIn = logIn;
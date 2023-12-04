const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();


const userRoutes = require('./Routes/users-routes');
const clinicalRoutes = require('./Routes/clinical-routes');
const visitRoutes = require('./Routes/visit-routes');
const contactUsRoutes = require('./Routes/contactUS-routes')

app.use(bodyParser.json())
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();


})


app.use('/user',userRoutes);
app.use('/clinical',clinicalRoutes);
app.use('/visit',visitRoutes);
app.use('/contactUs',contactUsRoutes)

app.use((req, res, next) => {
    throw new HttpError("couldn't find this route", 404);
  });

app.use((error,req,res,next) => {
    if (res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message : error.message || 'An unknown error occured !'})
})


mongoose
//.connect('mongodb+srv://RayenBelHadj:deadman<3@cluster0.bdrumzs.mongodb.net/cluster0?retryWrites=true&w=majority')
.connect('mongodb://127.0.0.1/DentalSite')
.then(()=>{
    app.listen(5000); 
})
.catch(error=>{
    console.log("error Connection to DataBase", error.message)
});
mongoose.set('strictQuery', false);
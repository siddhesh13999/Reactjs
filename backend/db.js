const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://siddheshbadgujar2050:root@cluster0.uexel05.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo= ()=>{
    mongoose.connect(mongoURI)
    .then(()=>console.log("Connected to Mongo Succesfully"))
    .catch((err)=>console.log(err))
}

module.exports = connectToMongo;
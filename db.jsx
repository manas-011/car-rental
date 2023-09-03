const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://user:manas@cluster0.nduq4sr.mongodb.net/car-rental-hub' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose ;
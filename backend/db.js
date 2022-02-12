const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Rudra:rudra1234@first.gtdpu.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;
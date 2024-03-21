const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://piyushpawar:En7sKHvQCQVToRlm@cluster0.0pdtyn8.mongodb.net/Notes_APP');

        console.log(`Database Connected: ${conn.connection.host}`);

    }catch(e){
        console.log(e);
    };
}


module.exports = connectDB;
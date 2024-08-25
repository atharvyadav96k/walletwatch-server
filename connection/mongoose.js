const mongoose = require('mongoose');

const connectDataBase = async ()=>{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DataBase Connected successfully");
}
module.exports = connectDataBase;
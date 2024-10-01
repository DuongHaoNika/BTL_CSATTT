const mongoose = require('mongoose');
module.exports.connect = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/web");
        console.log("Connect database sucess!");
    }catch(error)
    {
        console.log("Connect Error!!");
    }
}
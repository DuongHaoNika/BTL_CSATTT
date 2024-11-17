const mongoose = require('mongoose');
module.exports.connect = async () => {
    try{
        await mongoose.connect(process.env.URL_DB);
        console.log("Connect database sucess!");
    }catch(error)
    {
        console.log("Connect Error!!");
    }
}
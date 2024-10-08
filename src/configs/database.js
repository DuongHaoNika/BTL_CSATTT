const mongoose = require('mongoose');
module.exports.connect = async () => {
    try{
        await mongoose.connect("mongodb+srv://luongtrinh2k3ndad:cUAJ1z49CLXJ8AVy@cluster0.tsdoq.mongodb.net/web");
        console.log("Connect database sucess!");
    }catch(error)
    {
        console.log("Connect Error!!");
    }
}
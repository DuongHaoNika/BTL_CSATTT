const { workerData, parentPort } = require('worker_threads');
const mongoose = require('mongoose');
const User = require('../models/user.model.js');

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://luongtrinh2k3ndad:cUAJ1z49CLXJ8AVy@cluster0.tsdoq.mongodb.net/web', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Worker connected to MongoDB!');
    } catch (error) {
        parentPort.postMessage({ status: 'error', message: 'Database connection failed: ' + error.message });
        process.exit(1);
    }
}


async function saveUser(userData) {
    try {
        const user = new User(userData);
        await user.save();
        console.log('User saved successfully!');
        parentPort.postMessage({ status: 'success', message: 'User saved successfully.' });
    } catch (error) {
        parentPort.postMessage({ status: 'error', message: error.message });
    }
}


(async () => {
    await connectToDatabase();
    await saveUser(workerData);
})();

const express = require('express');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');  
const loginApp = express();
const loginPort = process.env.LOGIN_PORT || 3000;

loginApp.set('views', path.join(__dirname, 'view'));
loginApp.set('view engine', 'ejs');
loginApp.use(express.json());
loginApp.use(express.urlencoded({ extended: true }));
loginApp.use(morgan('dev'));
loginApp.use(express.static(path.join(__dirname, '/public')));

const indexRouter = require('./router/index');
loginApp.use(indexRouter);

loginApp.use(cors());

const database = require('./configs/database.js');
database.connect();

loginApp.listen(loginPort, () => {
    console.log(`Login app is listening on port ${loginPort}`);
});

const saveApp = express();
const savePort = process.env.SAVE_PORT || 3001;

saveApp.use(express.json());
saveApp.use(express.urlencoded({ extended: true }));
saveApp.use(cors()); 

const saveRouter = require('./controllers/saveUser.worker');
saveApp.use('/save', saveRouter);

saveApp.listen(savePort, '0.0.0.0',() => {
    console.log(`Save app is listening on port ${savePort}`);
});

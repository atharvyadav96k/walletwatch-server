const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
// routers
const indexRouter = require('./router/index');
const userRouter = require('./router/user');
// 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();
const connectDataBase = require('./connection/mongoose');

app.use('/', indexRouter);
app.use('/user', userRouter);

connectDataBase();
app.listen(3000, ()=>{
    console.log("app is running on port number 3000")
})
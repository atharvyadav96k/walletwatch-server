const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const {isAuthenticated} = require('./utils/authincation');

// routers
const apiRouter = require('./routes/apiRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


require('dotenv').config();
const connectDataBase = require('./connection/mongoose');

app.use('/api', apiRouter);
app.get("*", (req, res)=>{
    res.send("error");
})
connectDataBase();
app.listen(3000, ()=>{
    console.log("app is running on port number 3000");
});
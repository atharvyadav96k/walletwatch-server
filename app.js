const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const {isAuthenticated} = require('./utils/authincation');
const cors = require('cors')
// routers
const apiRouter = require('./routes/apiRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));


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
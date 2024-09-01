const express = require('express');
const userRouter = express.Router();
const {userRegister, userLogin} = require('../controllers/userController');
const categoryRouter = require('../routes/categoryRouter');

userRouter.use('/categorys', categoryRouter);

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin)

module.exports = userRouter;
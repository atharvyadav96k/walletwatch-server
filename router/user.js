const express = require('express');
const { body, validationResult } = require('express-validator');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const validateUser = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('username')
    .trim()
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long')
    .matches(/^\S*$/).withMessage('Username should not contain spaces')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      success: false
    });
  }
  next();
};

userRouter.post('/register', validateUser, handleValidationErrors, userController.userRegister);
userRouter.post('/login', userController.userLogin);

module.exports = userRouter;

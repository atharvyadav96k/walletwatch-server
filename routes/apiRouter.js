const express = require('express');
const router = express.Router();
const userRouter = require('./usersRouter')

router.use('/users', userRouter)
router.get('/', function(req, res){
    res.send("hello")
})
module.exports = router;
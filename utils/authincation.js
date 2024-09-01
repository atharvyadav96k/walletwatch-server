const jwt = require('jsonwebtoken')
exports.isAuthenticated = async (req, res, next)=>{
    console.log(req.cookies.secret)
    try{
        const decoded = jwt.verify(req.cookies.secret,  
            process.env.JWT_SECRET);
        console.log(decoded)
    }catch(error){
        console.log(error.message)
    }
    
    next();
}
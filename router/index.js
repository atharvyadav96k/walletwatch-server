const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("Hello Mother Father")
});

module.exports = router;
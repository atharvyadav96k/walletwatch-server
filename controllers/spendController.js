exports.all = (req, res)=>{
    res.send("All spends");
}

exports.add = (req, res)=>{
    res.send("spend added successfully")
}
exports.edit = (req, res)=>{
    res.send("spend edit successfully")
}
exports.delete = (req, res)=>{
    res.send("send deleted successfully")
}
exports.share = (req, res)=>{
    res.send("This is shared content");
}
exports.add = (req, res)=>{
    res.send("Added category");
}
exports.edit = (req, res)=>{
    res.send("edit category");
}
exports.delete = (req, res)=>{
    res.send("delete category");
}
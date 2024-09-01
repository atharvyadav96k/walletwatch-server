const spendsSchema = require('../models/spends');
const categorySchema = require('../models/category');
exports.spends = async (req, res) =>{
    const {categoryid} = req.params;
    try{
        const spends = await categorySchema.findById(categoryid).select('_id').populate('spendIds');
        return res.status(202).json({
            success: true,
            response: spends,
            message: "all spends"
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `error: ${error.message}`
        })
    }
}
exports.create = async (req, res) =>{
    const {categoryid} = req.params;
    console.log(categoryid)
    const {title, amount, paymentMethod, description} = req.body;
    try{
        if(title){
            const category = await categorySchema.findById(categoryid);
            console.log(category);
            if(category){
                const spend = await spendsSchema({
                    title: title,
                    amount: amount,
                    paymentMethod: paymentMethod,
                    description: description
                });
                await spend.save();
                category.spendIds.push(spend._id);
                await category.save();
                return res.status(200).json({
                    success: true,
                    response: spend,
                    message: `all spends in category`
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "category not found"
                })
            }
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `error: ${error.message}`
        })
    }
}
exports.delete = async (req, res) =>{
    const {categoryid, spendId} = req.params; 
    try{
        if(categoryid && spendId){
            const category = await categorySchema.findById(categoryid);
            category.spendIds.pop(spendId);
            await category.save();
            await spendsSchema.findOneAndDelete({_id: spendId});
            return res.status(200).json({
                success: true,
                message: `spend deleted successfully ${spendId}`
            })
        }else{
            return res.status(404).json({
                success: false,
                message: 'all fields are required'
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            error: `error : ${error.message}`
        })
    }
}
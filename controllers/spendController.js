const categorySchema = require('../models/category');
const spendsSchema = require('../models/spends');
const mongoose = require('mongoose')
exports.all = (req, res) => {
    res.send("All spends");
}

exports.add = async (req, res) => {
    try {
        const {title, amount, paymentMethod, description } = req.query;
        let categoryId = req.params.category;   
        const category = await categorySchema.findById(categoryId).populate({path: 'userId', select: '_id',});

        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }
        const spends = await spendsSchema({
            title,
            amount,
            paymentMethod,
            description
        })
        await spends.save();
        category.spendIds.push(spends._id);
        await category.save();
        console.log(category);
        return res.status(200).send({
            success: true,
            message: "spends created successfully"
        })
    } catch (error) {
        console.error('Error fetching category:', error.message);
        res.status(500).send({ error: 'Something went wrong' });
    }
};

exports.edit = (req, res) => {
    res.send("spend edit successfully")
}
exports.delete = async (req, res) => {
    const {spendId, categoryId} = req.params;
    try{
        const category = await categorySchema.findById(categoryId);
        if(category){
            const spend = await spendsSchema.findOneAndDelete({_id: spendId});
            category.spendIds.pop(spendId);
            await category.save();
            return res.status(200).send({
                success: true,
                message: 'spend deleted successfully'
            });
        }else{
            return res.status(400).send({
                success: false,
                message: "category not found"
            })
        }
    }catch(error){
        console.log(error.message)
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}
const { response } = require('express');
const category = require('../models/category');
const categorySchema = require('../models/category');
const userSchema = require('../models/user');
const spendSchema = require('../models/spends')

exports.create = async (req, res) =>{
    const userId = req.params.userId;
    const { categoryName, shareable} = req.body;
    try{
        if(userId && categoryName){
            const user = await userSchema.findById(userId);
            if(user){
                const category = await categorySchema({
                    categoryName: categoryName,
                    userId: userId,
                    shareable: shareable
                });
                await category.save();
                user.category.push(category._id);
                await user.save();
                return res.status(202).json({
                    success: false,
                    response: {
                        category
                    },
                    message: "category created successfully"
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }
            
        }else{
            return res.status(400).json({
                success: false,
                message: "user id and category name is required"
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error.message}`
        })
    }
}
exports.getAll = async (req, res) =>{
    const userId = req.params.userId;
    try{
        if(userId){
            const categorys = await categorySchema.find({userId: userId}).select('-shareable -spendIds');
            return res.status(200).json({
                success: true,
                response: categorys,
                message: `all category's of user ${userId}`
            });
        }else{
            return res.status(400).json({
                message: "user id is required",
                success: false
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `error ${error.message}`
        });
    }
}
exports.edit = async (req, res) =>{
    const {userId} = req.params;
    const {categoryName, categoryId} = req.body;
    try{
        if(categoryName && categoryName){
            const category = await categorySchema.findById(categoryId);
            category.categoryName = categoryName;
            await category.save();
            return res.status(203).json({
                success: false,
                response: {
                    category
                },
                message: "edit successful"
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "invalid category id or user id"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Internal Error : ${error.message}`
        })
    }
}
exports.delete = async (req, res) =>{
    const userId = req.params.userId;
    const {categoryId} = req.body;
    console.log(userId, categoryId)
    try{
        if(userId && category){
            const category = await categorySchema.findOne({_id: categoryId});
            await spendSchema.deleteMany({_id: {$in: category.spendIds}});
            const user = await userSchema.findById(category.userId);
            user.category.pop(categoryId);
            await user.save();
            await categorySchema.findOneAndDelete({_id: categoryId});
            return res.status(200).json({
                success: true,
                message: "category deleted successfully",
                response: {
                    categoryId
                }
            });
        }else{
            return res.status(300).json({
                success: false,
                message: "all fields are required"
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `error : ${error.message}`
        })
    }
}
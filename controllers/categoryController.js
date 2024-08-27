const categorySchema = require('../models/category');
const userSchema = require('../models/user');
const spendSchema = require('../models/spends')
const { findOneAndDelete } = require('../models/user');
exports.share = async (req, res) => {
    const {categoryid} = req.params;
    try{
        const category = await categorySchema.findById(categoryid).select("-userId -__v1").populate({path: 'spendIds'});
        console.log(category)
        if(category.shareable){
            return res.status(202).send({
                success: true,
                category
            });
        }else{
            return res.status(300).send({
                success: false,
                message: "bad gateway"
            })
        }
    }catch(error){
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        });
    }
}
exports.sharePublic = async (req, res) => {
    const {categoryid} = req.params; 
    try{
        const category = await categorySchema.findById(categoryid);
        console.log(category)
        category.shareable = true;
        await category.save();
        return res.status(204).send({
            success : true,
            message: "category is public now"
        })
    }catch(error){
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}
exports.sharePrivate = async (req, res) =>{
    const {categoryid} = req.params; 
    try{
        const category = await categorySchema.findById(categoryid);
        category.shareable = false;
        await category.save();
        return res.status(204).send({
            success : true,
            message: "category is private now"
        })
    }catch(error){
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}
exports.all = async (req, res) => {
    const { userid } = req.params;
    const userData = await userSchema.findById(userid).select('-username -password -email -createdAt -updatedAt -__v').populate({
        path: 'category',
        select: ' -userId -__v -spendIds'
    })
    return res.status(200).send({
        success: true,
        userData
    })
}
exports.myspends = async (req, res) => {
    const categoryId = req.params.categoryid;
    try{
        const categorySpends = await categorySchema.findById(categoryId).select('-userId').populate({
            path: 'spendIds',
            select: '-__v'
        });
        return res.status(200).send({
            success: true,
            categorySpends
        })
    }catch(error){
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
    
}
exports.add = async (req, res) => {
    const { userId, categoryName, shareable } = req.query;
    try {
        if (userId && categoryName && shareable) {
            const user = await userSchema.findById(userId);
            if (user) {
                const category = await categorySchema({
                    userId,
                    categoryName,
                    shareable
                });
                await category.save();
                user.category.push(category._id);
                await user.save();
                return res.status(200).send({
                    success: true,
                    message: "category created successfully"
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: "User Not found"
                })
            }

        } else {
            return res.status(400).send({
                success: false,
                message: "all fields are required"
            });
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            success: false,
            message: "internal server error"
        })
    }
}
exports.edit = async (req, res) => {
    try {
        let { newName, categoryId } = req.body;
        if (newName != '') {
            newName = validateAndTrimString(newName);
            const category = await categorySchema.findById(categoryId);
            if (category) {
                category.categoryName = newName;
                await category.save();
                return res.status(202).send({
                    success: true,
                    message: 'Category name updated successfully'
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Category not found'
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).send({
            success: false,
            message: 'Unable to perform operation'
        });
    }
};
exports.delete = async (req, res) => {
    const categoryId = req.params.categoryid;
    try {
        if (categoryId) {
            const category = await categorySchema.findOne({ _id: categoryId });
            await spendSchema.deleteMany({_id: {$in: category.spendIds}});
            await categorySchema.findOneAndDelete({_id: categoryId});
            const user = await userSchema.findById(category.userId);
            user.category.pop(category._id);
            await user.save();
            return res.status(200).send({
                success: true,
                message: "category deleted successfully"
            })
        } else {
            return res.status(400).send({
                success: false,
                message: 'unable to delete category'
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}
const validateAndTrimString = (inputString) => {
    const trimmedString = inputString.trim();
    return trimmedString === '' ? '' : trimmedString;
};
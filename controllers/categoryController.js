const categorySchema = require('../models/category');
const { findOneAndDelete } = require('../models/user');
exports.share = (req, res) => {
    res.send("This is shared content");
}
exports.add = async (req, res) => {
    const { userId, categoryName, sharable } = req.query;
    try {
        if (userId && categoryName && sharable) {
            const category = await categorySchema({
                userId,
                categoryName,
                sharable
            });
            await category.save();
            return res.status(200).send({
                success: true,
                message: "category created successfully"
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "all fields are required"
            });
        }
    } catch (error) {
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
    try{
        if(categoryId){
          const category = await categorySchema.findOneAndDelete({_id: categoryId});
          return res.status(200).send({
            success: true,
            message: "category deleted successfully"
          })  
        }else{
            return res.status(400).send({
                success: false,
                message: 'unable to delete category'
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

const validateAndTrimString = (inputString) => {
    const trimmedString = inputString.trim();
    return trimmedString === '' ? '' : trimmedString;
};
const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');
const spendRouter = require('../router/spends');
// user/category/username
categoryRouter.get('/share/:categoryid', categoryController.share);
categoryRouter.get('/sharepublic/:categoryid', categoryController.sharePublic);
categoryRouter.get('/shareprivate/:categoryid', categoryController.sharePrivate);
categoryRouter.get('/allcategory/:userid', categoryController.all)
categoryRouter.get('/myspends/:categoryid', categoryController.myspends)
categoryRouter.get('/add', categoryController.add);
categoryRouter.patch('/edit/', categoryController.edit);
categoryRouter.delete('/delete/:categoryid', categoryController.delete);
categoryRouter.use('/spends', spendRouter);
module.exports = categoryRouter;
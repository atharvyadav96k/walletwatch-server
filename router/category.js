const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');
const spendRouter = require('../router/spends');
// user/category/username
categoryRouter.get('/share/:categoryid', categoryController.share);
categoryRouter.get('/all/:userid', categoryController.all)
categoryRouter.get('/add', categoryController.add);
categoryRouter.patch('/edit/', categoryController.edit);
categoryRouter.delete('/delete/:categoryid', categoryController.delete);
categoryRouter.use('/:categoryid/spends', spendRouter);
module.exports = categoryRouter;
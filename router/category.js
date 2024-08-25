const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');
// user/category/username
categoryRouter.get('/share/:categoryid', categoryController.share);
categoryRouter.get('/add', categoryController.add);
categoryRouter.patch('/edit/:categoryid', categoryController.edit);
categoryRouter.delete('/delete/:categoryid', categoryController.delete);

module.exports = categoryRouter;
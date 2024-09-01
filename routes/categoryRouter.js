const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');
const spendRouter = require('../routes/spendRouter');

categoryRouter.use('/spends', spendRouter);

categoryRouter.post('/create/:userId', categoryController.create);
categoryRouter.get('/:userId', categoryController.getAll);
categoryRouter.put('/edit/:userId', categoryController.edit)
categoryRouter.delete('/delete/:userId', categoryController.delete);
module.exports = categoryRouter;
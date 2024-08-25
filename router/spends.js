const express = require('express');
const spendRouter = express.Router();
const spendController = require('../controllers/spendController');

spendRouter.get('/', spendController.all);
spendRouter.get('/add/', spendController.add);
spendRouter.patch('/edit/:spendId', spendController.edit);
spendRouter.delete('/delete/:spendId', spendController.delete)

module.exports = spendRouter;
const express = require('express');
const spendRouter = express.Router();
const spendController = require('../controllers/spendController');

// user/spends/username/
spendRouter.get('/', spendController.all);
spendRouter.get('/add/:category', spendController.add);
spendRouter.patch('/edit/:spendId', spendController.edit);
spendRouter.delete('/delete/:categoryId/:spendId', spendController.delete);

module.exports = spendRouter;
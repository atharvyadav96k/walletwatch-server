const express = require('express');
const spendRouter = express.Router();
const spendController = require('../controllers/spendController');

spendRouter.get('/:categoryid', spendController.spends);
spendRouter.post('/create/:categoryid', spendController.create)
spendRouter.delete('/delete/:categoryid/:spendId', spendController.delete)
module.exports = spendRouter;
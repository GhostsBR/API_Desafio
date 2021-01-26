const express = require('express');
const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

const responseRouter = express.Router();
responseRouter.get('/api/responses', apiController.responses);
responseRouter.get('/api/responses/:id', apiController.responsesFind);
responseRouter.post('/api/responses/', apiController.responsesInsert);
responseRouter.put('/api/responses/:id', apiController.responsesEdit);
responseRouter.delete('/api/responses/:id', apiController.responsesDelete);

module.exports = responseRouter;
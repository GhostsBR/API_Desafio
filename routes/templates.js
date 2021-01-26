const express = require('express');
const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

const templateRouter = express.Router();
templateRouter.get('/api/templates', apiController.templates);
templateRouter.get('/api/templates/:id', apiController.templatesFind);
templateRouter.post('/api/templates', apiController.templatesInsert);
templateRouter.put('/api/templates/:id', apiController.templatesEdit);
templateRouter.delete('/api/templates/:id', apiController.templatesDelete);

module.exports = templateRouter;
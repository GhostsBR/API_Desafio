const express = require('express');
const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

const indexRouter = express.Router();
indexRouter.get('/', homeController.index);
indexRouter.get('/templates', homeController.templates);
indexRouter.post('/templates', homeController.templatesAction);
indexRouter.get('/responses', homeController.responses);
indexRouter.post('/responses', homeController.responsesAction);
indexRouter.get('/students', homeController.students);
indexRouter.post('/students', homeController.studentsAction);
indexRouter.get('/approved', homeController.approved);

indexRouter.get('/api/grades/:id', apiController.gradesFind);
indexRouter.get('/api/approved', apiController.approved);

module.exports = indexRouter;
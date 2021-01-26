const express = require('express');
const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

const studentsRouter = express.Router();
studentsRouter.get('/api/students', apiController.students);
studentsRouter.get('/api/students/:id', apiController.studentsFind);
studentsRouter.post('/api/students', apiController.studentsInsert);
studentsRouter.put('/api/students/:id', apiController.studentsEdit);
studentsRouter.delete('/api/students/:id', apiController.studentsDelete);

module.exports = studentsRouter;
const express = require('express');
const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

//ROTAS
const router = express.Router();
router.get('/', homeController.index);
router.get('/templates', homeController.templates);
router.post('/templates', homeController.templatesAction);
router.get('/responses', homeController.responses);
router.post('/responses', homeController.responsesAction);
router.get('/students', homeController.students);
router.post('/students', homeController.studentsAction);
router.get('/grades', homeController.grades);
router.get('/approved', homeController.approved);

//API
//Gabaritos
router.get('/api/templates', apiController.templates);
router.get('/api/templates/:id', apiController.templatesFind);
router.post('/api/templates', apiController.templatesInsert);
router.put('/api/templates/:id', apiController.templatesEdit);
router.delete('/api/templates/:id', apiController.templatesDelete);
//Respostas
router.get('/api/responses', apiController.responses);
router.get('/api/responses/:id', apiController.responsesFind);
router.post('/api/responses/', apiController.responsesInsert);
router.put('/api/responses/:id', apiController.responsesEdit);
router.delete('/api/responses/:id', apiController.responsesDelete);
//Nota Final
router.get('/api/grades/:name', apiController.gradesFind);
//Lista de Alunos
router.get('/api/students', apiController.students);
router.get('/api/students/:id', apiController.studentsFind);
router.post('/api/students', apiController.studentsInsert);
router.put('/api/students/:id', apiController.studentsEdit);
router.delete('/api/students/:id', apiController.studentsDelete);
//Lista de Alunos Aprovados
router.get('/api/approved', apiController.approved);

module.exports = router;
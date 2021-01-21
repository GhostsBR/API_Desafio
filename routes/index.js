const express = require('express');
const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

//ROTAS
const router = express.Router();
router.get('/', homeController.index);
router.get('/templates', homeController.templates);
router.post('/templates', homeController.templatesAction);
router.get('/responses', homeController.responses);
router.get('/grades', homeController.grades);
router.get('/approved', homeController.approved);

//API
//Gabaritos
router.get('/api/templates', apiController.templates);
router.get('/api/templates/find/:id', apiController.templatesFind);
router.post('/api/templates/insert', apiController.templatesInsert);
router.put('/api/templates/edit/:id', apiController.templatesEdit);
router.delete('/api/templates/delete/:id', apiController.templatesDelete);
//Respostas
router.get('/api/responses', apiController.responses);
router.get('/api/responses/find/:id', apiController.responsesFind);
router.post('/api/responses/insert', apiController.responsesInsert);
router.put('/api/responses/edit/:id', apiController.responsesEdit);
router.delete('/api/responses/delete/:id', apiController.responsesDelete);

module.exports = router;
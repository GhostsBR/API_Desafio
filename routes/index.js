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

module.exports = router;
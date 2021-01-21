const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();
router.get('/', homeController.index);
router.get('/templates', homeController.templates);
router.get('/api/templates', apiController.templates);
router.get('/responses', homeController.responses);
router.get('/grades', homeController.grades);
router.get('/approved', homeController.approved);

module.exports = router;
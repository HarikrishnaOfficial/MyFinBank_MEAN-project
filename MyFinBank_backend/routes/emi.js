const express = require('express');
const router = express.Router();
const emiController = require('../controllers/EMIController');

router.post('/emis', emiController.createEMI);
router.get('/emis', emiController.getAllEMIs);
router.get('/emis/:id', emiController.getEMIById);
router.put('/emis/:id', emiController.updateEMI);
router.delete('/emis/:id', emiController.deleteEMI);

module.exports = router;

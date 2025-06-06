const express = require('express');
const { getAllBuses, addBus, updateBus, deleteBus ,getBusById} = require('../controllers/busController');

const router = express.Router();


router.get('/', getAllBuses);     
router.get('/:id', getBusById);     
router.post('/', addBus);               
router.put('/:id', updateBus);          
router.delete('/:id', deleteBus);       

module.exports = router;

const express = require('express');
const router = express.Router();
const ResturantController = require('../controller/ResturantController');
const path = require('path')

router.get('/',   ResturantController.getAllRecords);
router.post('/',  ResturantController.addRecord);
router.get('/:id',  ResturantController.getSingleRecord)
router.put('/:id',  ResturantController.updateRecord);
router.delete('/:id',  ResturantController.deleteRecord)

module.exports = router;



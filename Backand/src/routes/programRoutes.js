const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const upload = require('../middlewares/upload');

router.get('/', programController.getAllPrograms);
router.post('/', upload.single('image'), programController.createProgram);
router.put('/:id', upload.single('image'), programController.updateProgram);
router.delete('/:id', programController.deleteProgram);

module.exports = router;

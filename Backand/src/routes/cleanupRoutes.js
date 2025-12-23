const express = require('express');
const router = express.Router();
const cleanupController = require('../controllers/cleanupController');

// GET /api/cleanup/validate - Scan dan report URL invalid (tidak hapus)
router.get('/validate', cleanupController.validateImages);

// POST /api/cleanup/run - Scan dan cleanup URL invalid
router.post('/run', cleanupController.cleanupImages);

module.exports = router;

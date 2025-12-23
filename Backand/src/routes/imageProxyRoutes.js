const express = require('express');
const router = express.Router();
const imageProxyController = require('../controllers/imageProxyController');

// GET /api/image/stats - Cache statistics (debugging)
router.get('/stats', imageProxyController.getCacheStats);

// GET /api/image/:fileId - Proxy gambar dari Google Drive
router.get('/:fileId', imageProxyController.getImage);

module.exports = router;

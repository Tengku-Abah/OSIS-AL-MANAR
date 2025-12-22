const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middlewares/upload');

router.get('/', galleryController.getAllGalleryItems);
router.post('/', upload.single('image'), galleryController.uploadGalleryItem);
router.patch('/:id/status', galleryController.toggleGalleryStatus);
router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const upload = require('../middlewares/upload');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', upload.single('image'), newsController.createNews);
router.put('/:id', upload.single('image'), newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;

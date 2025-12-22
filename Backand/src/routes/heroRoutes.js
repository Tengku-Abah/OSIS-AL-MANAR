const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const upload = require('../middlewares/upload');

router.get('/', heroController.getHeroSettings);
router.put('/', upload.single('image'), heroController.updateHeroSettings);

module.exports = router;

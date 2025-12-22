const express = require('express');
const router = express.Router();
const aspirationController = require('../controllers/aspirationController');

router.get('/', aspirationController.getAllAspirations);
router.post('/', aspirationController.createAspiration);
router.patch('/:id/privacy', aspirationController.toggleAspirationPrivacy);

module.exports = router;

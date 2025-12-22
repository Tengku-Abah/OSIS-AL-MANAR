const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const upload = require('../middlewares/upload');

router.get('/', memberController.getAllMembers);
router.post('/', upload.single('photo'), memberController.createMember);
router.put('/:id', upload.single('photo'), memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;

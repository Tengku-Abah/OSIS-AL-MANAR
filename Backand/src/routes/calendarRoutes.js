const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.getAllEvents);
router.post('/', calendarController.createEvent);
router.delete('/:id', calendarController.deleteEvent);

module.exports = router;

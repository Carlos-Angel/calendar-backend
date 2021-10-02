const { Router } = require('express');
const eventController = require('../controllers/event.controller');
const router = Router();
const { jwtValidator } = require('../middlewares/jwt-validator');

/** rutas: /api/event */

router.use(jwtValidator);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.addEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;

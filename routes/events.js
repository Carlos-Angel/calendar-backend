const { Router } = require('express');
const { check } = require('express-validator');
const eventController = require('../controllers/event.controller');
const { isDate } = require('../helpers/isDate');
const router = Router();
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

/** rutas: /api/event */

router.use(jwtValidator);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post(
  '/',
  [
    check('title', 'name is required').not().isEmpty(),
    check('start', 'start date is required').custom(isDate),
    check('end', 'end date is required').custom(isDate),
    fieldValidator,
  ],
  eventController.addEvent,
);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;

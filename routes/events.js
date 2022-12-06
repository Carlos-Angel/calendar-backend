const { Router } = require('express');
const { check } = require('express-validator');
const eventController = require('../controllers/event.controller');
const { isDate } = require('../helpers/isDate');
const router = Router();
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

/** rutas: /api/event */

router.use(jwtValidator);

/**
 * @openapi
 * /api/events:
 *   get:
 *     tags:
 *       - events
 *     summary: obtener los eventos de un usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: events listed
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/eventDto'
 */

router.get('/', eventController.getEvents);

/**
 * @openapi
 * /api/events/{id}:
 *   get:
 *     tags:
 *       - events
 *     summary: obtener un evento
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID del evento
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: event found
 *                 event:
 *                   type: object
 *                   $ref: '#/components/schemas/eventDto'
 */
router.get('/:id', eventController.getEvent);

/**
 * @openapi
 * /api/events:
 *   post:
 *     tags:
 *       - events
 *     summary: crear un evento
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createEventDto'
 *         required: true
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: event created
 *                 event:
 *                   type: object
 *                   $ref: '#/components/schemas/eventDto'
 */
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

/**
 * @openapi
 * /api/events/{id}:
 *   put:
 *     tags:
 *       - events
 *     summary: actualizar un evento
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID del evento
 *          required: true
 *          schema:
 *            type: string
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateEventDto'
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: event updated
 *                 event:
 *                   type: object
 *                   $ref: '#/components/schemas/eventDto'
 */
router.put('/:id', eventController.updateEvent);

/**
 * @openapi
 * /api/events/{id}:
 *   delete:
 *     tags:
 *       - events
 *     summary: eliminar un evento
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID del evento
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: event removed
 */
router.delete('/:id', eventController.deleteEvent);

module.exports = router;

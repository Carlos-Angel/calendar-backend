const { Schema, model } = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     eventDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         notes:
 *           type: string
 *         start:
 *           type: string
 *           example: 2022-12-06T04:03:39.147Z
 *         end:
 *           type: string
 *           example: 2022-12-06T04:03:39.147Z
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *     createEventDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         notes:
 *           type: string
 *           required: false
 *         start:
 *           type: string
 *           example: 2022-12-06T04:03:39.147Z
 *         end:
 *           type: string
 *           example: 2022-12-06T04:03:39.147Z
 *     updateEventDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         notes:
 *           type: string
 *           required: false
 *         start:
 *           type: string
 *           example: 2022-12-06T04:03:39.147Z
 *         end:
 *           type: string
 *           example: 2022-12-06T04:03:39.147Z
 */
const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('event', EventSchema);

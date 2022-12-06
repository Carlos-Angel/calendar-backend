const { Router } = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auh.controller');
const router = Router();
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

/** rutas: /api/auth */

/**
 * @openapi
 * /api/auth/new:
 *   post:
 *     tags:
 *       - auth
 *     summary: crear un nuevo usuario
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createUserDto'
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
 *                   example: user created
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     name:
 *                       type: string
 */
router.post(
  '/new',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email not valid').isEmail(),
    check('password', 'password must be than 5 characters. ').isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  authController.signIn,
);

/**
 * @openapi
 * /api/auth:
 *   post:
 *     tags:
 *       - auth
 *     summary: iniciar sesión
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginDto'
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
 *                   example: login successfully
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     name:
 *                       type: string
 */
router.post(
  '/',
  [
    check('email', 'email not valid').isEmail(),
    check('password', 'password must be than 5 characters. ').isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  authController.login,
);

/**
 * @openapi
 * /api/auth/renew:
 *   post:
 *     tags:
 *       - auth
 *     summary: revalidar token
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
 *                   example: reset token
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     name:
 *                       type: string
 */
router.get('/renew', jwtValidator, authController.resetToken);

module.exports = router;

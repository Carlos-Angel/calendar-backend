const { Router } = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auh.controller');
const router = Router();

/** rutas: /api/auth */

router.post(
  '/sign-in',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email not valid').isEmail(),
    check('password', 'password must be than 5 characters. ').isLength({
      min: 6,
    }),
  ],
  authController.signIn,
);
router.post(
  '/login',
  [
    check('email', 'email not valid').isEmail(),
    check('password', 'password must be than 5 characters. ').isLength({
      min: 6,
    }),
  ],
  authController.login,
);
router.get('/reset-token', authController.resetToken);

module.exports = router;

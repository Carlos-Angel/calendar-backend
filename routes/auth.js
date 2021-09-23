const {Router} = require('express');
const authController = require('../controllers/auh.controller');
const router = Router();


/** rutas: /api/auth */

router.post('/sign-in',authController.signIn);
router.post('/login',authController.login);
router.get('/reset-token',authController.resetToken);


module.exports = router
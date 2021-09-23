const {Router} = require('express');
const router = Router();

/** rutas: /api/auth */

router.get('/',(req,res)=> {
  res.json({ok: true})
});


module.exports = router
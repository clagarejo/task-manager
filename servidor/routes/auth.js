const { Router } = require('express');
const { crearUsuario, loginUsuario } = require('../controllers/auth');

const router = Router();

router.post('/new', crearUsuario);
router.post('/', loginUsuario);

module.exports = router;

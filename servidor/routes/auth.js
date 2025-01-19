const { Router } = require('express');
const { check } = require('express-validator');  
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio y debe ser un correo válido').isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos,
], crearUsuario);

router.post('/', [
    check('email', 'El correo es obligatorio y debe ser un correo válido').isEmail(),
    check('password', 'La contraseña es obligatoria').exists(),
    validarCampos,
], loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;

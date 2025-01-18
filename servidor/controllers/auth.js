const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya hay un usuario registrado con ese correo'
            });
        }

        // Crear un nuevo usuario
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar el nuevo usuario en la base de datos
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        // Muestra el error exacto
        console.log('Error en la creación del usuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos con el email proporcionado
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            // Si no se encuentra el usuario, responder con un error
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        // Comparar las contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            // Si la contraseña no es válida, responder con un error
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);

        // Responder con los datos del usuario y el token
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        // Capturar cualquier error y responder con el mensaje adecuado
        console.log('Error en el proceso de login:', error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha encontrado un usuario con esas credenciales'
        });
    }
};


const revalidarToken = async (req, res = response) => {

    const { uid, name } = req

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

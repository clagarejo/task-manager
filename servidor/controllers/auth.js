const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const createUsers = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya hay un usuario registrado con ese correo'
            });
        }

        usuario = new User(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

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
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsers = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se ha encontrado un usuario con esas credenciales'
        });
    }
};


const revalidateToken = async (req, res = response) => {

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
    createUsers,
    loginUsers,
    revalidateToken
}

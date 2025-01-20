const { createUsers, loginUsers } = require('../../controllers/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../../helpers/jwt');

jest.mock('../../models/User');
jest.mock('../../helpers/jwt');


describe('Pruebas para la función createUsers', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: '123456',
                name: 'Test User'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('debería devolver error si el usuario ya existe', async () => {
        User.findOne = jest.fn().mockResolvedValue({}); // Usuario ya existe

        await createUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            ok: false,
            msg: 'Ya hay un usuario registrado con ese correo'
        });
    });
});

describe('Pruebas para la función loginUsers', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: '123456'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('debería devolver error si el usuario no existe', async () => {
        User.findOne = jest.fn().mockResolvedValue(null); // El usuario no existe

        await loginUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            ok: false,
            msg: 'Credenciales incorrectas'
        });
    });
});

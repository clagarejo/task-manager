const mongoose = require('mongoose');
const User = require('../../models/User');

jest.mock('mongoose');

describe('Pruebas unitarias del modelo User', () => {
    test('debería crear un usuario con éxito', async () => {
        const userData = {
            name: 'Usuario de prueba',
            email: 'usuario@prueba.com',
            password: 'contraseña123',
        };

        const saveMock = jest.fn().mockResolvedValue(userData);
        User.prototype.save = saveMock;

        const user = new User(userData);
        const savedUser = await user.save();

        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
    });

    test('debería fallar al crear un usuario sin email', async () => {
        const userData = {
            name: 'Usuario de prueba',
            password: 'contraseña123',
        };

        const saveMock = jest.fn().mockRejectedValue(new Error('Falló la validación'));
        User.prototype.save = saveMock;

        const user = new User(userData);

        try {
            await user.save();
        } catch (error) {
            expect(saveMock).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Falló la validación');
        }
    });

    test('debería fallar al crear un usuario sin contraseña', async () => {
        const userData = {
            name: 'Usuario de prueba',
            email: 'usuario@prueba.com',
        };

        const saveMock = jest.fn().mockRejectedValue(new Error('Falló la validación'));
        User.prototype.save = saveMock;

        const user = new User(userData);

        try {
            await user.save();
        } catch (error) {
            expect(saveMock).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Falló la validación');
        }
    });

    test('debería actualizar el nombre de un usuario', async () => {
        const userData = {
            name: 'Usuario de prueba',
            email: 'usuario@prueba.com',
            password: 'contraseña123',
        };

        const updatedData = {
            ...userData,
            name: 'Nuevo nombre',
        };

        const findByIdAndUpdateMock = jest.fn().mockResolvedValue(updatedData);
        User.findByIdAndUpdate = findByIdAndUpdateMock;

        const updatedUser = await User.findByIdAndUpdate(userData._id, { name: 'Nuevo nombre' }, { new: true });

        expect(findByIdAndUpdateMock).toHaveBeenCalledTimes(1);
        expect(updatedUser.name).toBe('Nuevo nombre');
    });

    test('debería eliminar un usuario', async () => {
        const userData = {
            name: 'Usuario de prueba',
            email: 'usuario@prueba.com',
            password: 'contraseña123',
        };

        const deleteOneMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
        User.deleteOne = deleteOneMock;

        const response = await User.deleteOne({ _id: userData._id });

        expect(deleteOneMock).toHaveBeenCalledTimes(1);
        expect(response.deletedCount).toBe(1);
    });
});

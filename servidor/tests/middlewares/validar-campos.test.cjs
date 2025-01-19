const { body } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Ruta de prueba con el middleware
app.post('/test', [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    validarCampos
], (req, res) => {
    res.status(200).json({ ok: true });
});

describe('Pruebas para el middleware validarCampos', () => {
    test('debería devolver 400 si los campos no son válidos', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                name: '',
                email: 'invalid-email'
            });

        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.errors).toHaveProperty('name');
        expect(response.body.errors).toHaveProperty('email');
    });

    test('debería devolver 200 si los campos son válidos', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                name: 'Valid Name',
                email: 'valid@example.com'
            });

        expect(response.status).toBe(200);
        expect(response.body.ok).toBe(true);
    });
});

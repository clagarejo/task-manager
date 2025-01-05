const request = require('supertest');
const express = require('express');
const router = require('../routes');

const app = express();
app.use(express.json());
app.use(router);

describe('Rutas de tareas', () => {

    // Test para GET /tasks
    test('GET /tasks debe devolver una lista de tareas', async () => {
        const response = await request(app).get('/tasks');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2); // Asegúrate de que la lista contiene dos tareas inicialmente
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
    });

    // Test para POST /tasks
    test('POST /tasks debe agregar una nueva tarea', async () => {
        const newTask = { title: 'Tarea 3', description: 'Descripción de la tarea 3' };

        const response = await request(app).post('/tasks').send(newTask);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newTask.title);
        expect(response.body.description).toBe(newTask.description);
    });

    test('POST /tasks debe devolver error si falta un campo', async () => {
        const incompleteTask = { title: 'Tarea incompleta' };  // Faltando descripción

        const response = await request(app).post('/tasks').send(incompleteTask);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Todos los campos son requeridos');
    });

    // Test para DELETE /tasks/:id
    test('DELETE /tasks/:id debe eliminar una tarea', async () => {
        const taskId = 2;

        // Elimina la tarea
        const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
        expect(deleteResponse.status).toBe(204);

        // Verifica que la tarea fue eliminada
        const getResponse = await request(app).get('/tasks');
        expect(getResponse.body).toHaveLength(2); // Ahora debería haber 1 tarea (la otra que no fue eliminada)

        // Nos aseguramos que la tarea eliminada ya no esté en el array
        const deletedTask = getResponse.body.find(task => task.id === taskId);
        expect(deletedTask).toBeUndefined();  // La tarea eliminada no debe existir en el array
    });


});

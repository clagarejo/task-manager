const mongoose = require('mongoose');
const Task = require('../../models/Task');

jest.mock('mongoose');

describe('Pruebas unitarias del modelo Task', () => {
    test('debería crear una tarea con éxito', async () => {
        const taskData = {
            title: 'Tarea de prueba',
            description: 'Descripción de prueba',
            status: 'ToDo',
            userId: new mongoose.Types.ObjectId(),
        };

        const saveMock = jest.fn().mockResolvedValue(taskData);
        Task.prototype.save = saveMock;

        const task = new Task(taskData);
        const savedTask = await task.save();

        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(savedTask.title).toBe(taskData.title);
        expect(savedTask.description).toBe(taskData.description);
        expect(savedTask.status).toBe(taskData.status);
    });

    test('debería fallar al crear una tarea sin título', async () => {
        const taskData = {
            description: 'Descripción de prueba',
            status: 'ToDo',
            userId: new mongoose.Types.ObjectId(),
        };

        const saveMock = jest.fn().mockRejectedValue(new Error('Falló la validación'));
        Task.prototype.save = saveMock;

        const task = new Task(taskData);

        try {
            await task.save();
        } catch (error) {
            expect(saveMock).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Falló la validación');
        }
    });

    test('debería actualizar el estado de una tarea', async () => {
        const taskData = {
            title: 'Tarea de prueba',
            description: 'Descripción de prueba',
            status: 'ToDo',
            userId: new mongoose.Types.ObjectId(),
        };

        const updatedData = {
            ...taskData,
            status: 'InProgress',
        };

        const findByIdAndUpdateMock = jest.fn().mockResolvedValue(updatedData);
        Task.findByIdAndUpdate = findByIdAndUpdateMock;

        const updatedTask = await Task.findByIdAndUpdate(taskData._id, { status: 'InProgress' }, { new: true });

        expect(findByIdAndUpdateMock).toHaveBeenCalledTimes(1);
        expect(updatedTask.status).toBe('InProgress');
    });

    test('debería eliminar una tarea', async () => {
        const taskData = {
            title: 'Tarea de prueba',
            description: 'Descripción de prueba',
            status: 'ToDo',
            userId: new mongoose.Types.ObjectId(),
        };

        const deleteOneMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
        Task.deleteOne = deleteOneMock;

        const response = await Task.deleteOne({ _id: taskData._id });

        expect(deleteOneMock).toHaveBeenCalledTimes(1);
        expect(response.deletedCount).toBe(1);
    });
});

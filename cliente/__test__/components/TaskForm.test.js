import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TaskForm from '../../src/components/TaskForm';

test('debe coincidir con el snapshot', () => {
    const { asFragment } = render(<TaskForm onAddTask={() => { }} />);

    // Verifica si el componente se renderiza de acuerdo al snapshot
    expect(asFragment()).toMatchSnapshot();
});

// test('debe llamar onAddTask cuando el formulario es válido', () => {
//     const onAddTaskMock = jest.fn();

//     render(<TaskForm onAddTask={onAddTaskMock} />);

//     // Completa los campos del formulario
//     fireEvent.change(screen.getByPlaceholderText(/Título/i), { target: { value: 'Nueva tarea' } });
//     fireEvent.change(screen.getByPlaceholderText(/Descripción/i), { target: { value: 'Descripción de la tarea' } });
    
//     // Simula el envío del formulario
//     fireEvent.click(screen.getByText(/agregar tarea/i));

//     // Verifica que la función onAddTask haya sido llamada con los valores correctos
//     expect(onAddTaskMock).toHaveBeenCalledWith({
//         title: 'Nueva tarea',
//         description: 'Descripción de la tarea',
//     });
// });

test('llama a handleAddOrUpdateTask con los valores correctos al enviar el formulario', () => {
    const mockHandleAddOrUpdateTask = jest.fn();

    render(
        <TaskForm
            handleAddOrUpdateTask={mockHandleAddOrUpdateTask}
            editingTask={null}
            newTitle="Nueva tarea"
            newDescription="Descripción de la nueva tarea"
            setNewTitle={() => { }}
            setNewDescription={() => { }}
        />
    );

    // Simula el envío del formulario
    fireEvent.submit(screen.getByRole('button', { name: /agregar tarea/i }));

    // Asegura que la función se llamó con los valores correctos
    expect(mockHandleAddOrUpdateTask).toHaveBeenCalledWith({
        title: 'Nueva tarea',
        description: 'Descripción de la nueva tarea',
    });
});

test('no llama a handleAddOrUpdateTask si los campos están vacíos', () => {
    const mockHandleAddOrUpdateTask = jest.fn();

    render(
        <TaskForm
            handleAddOrUpdateTask={mockHandleAddOrUpdateTask}
            editingTask={null}
            newTitle=""
            newDescription=""
            setNewTitle={jest.fn()}
            setNewDescription={jest.fn()}
        />
    );

    fireEvent.click(screen.getByRole('button'));

    // Verifica que handleAddOrUpdateTask no se haya llamado
    expect(mockHandleAddOrUpdateTask).not.toHaveBeenCalled();
});







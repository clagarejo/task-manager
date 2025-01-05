import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';  // Agregado para las aserciones como toBeInTheDocument
import TaskForm from '../../src/components/TaskForm';

test('debe coincidir con el snapshot', () => {
    const { asFragment } = render(<TaskForm onAddTask={() => { }} />);

    // Verifica si el componente se renderiza de acuerdo al snapshot
    expect(asFragment()).toMatchSnapshot();
});

test('debe llamar onAddTask cuando el formulario es válido', () => {
    const onAddTaskMock = jest.fn();

    render(<TaskForm onAddTask={onAddTaskMock} />);

    // Completa los campos del formulario
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nueva tarea' } });
    fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Descripción de la tarea' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByText(/agregar tarea/i));

    // Verifica que la función onAddTask haya sido llamada con los valores correctos
    expect(onAddTaskMock).toHaveBeenCalledWith({
        title: 'Nueva tarea',
        description: 'Descripción de la tarea',
    });
});

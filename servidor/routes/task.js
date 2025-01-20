const express = require('express');
const { check } = require('express-validator');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/task');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get('/', getTasks);

router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
], addTask);

router.put('/:id', [
    check('id', 'El ID debe ser un identificador válido').isMongoId(),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('status', 'El estado es obligatorio y debe ser "Backlog", "ToDo", "InProgress", o "Done"').isIn(['Backlog', 'ToDo', 'InProgress', 'Done']),
    validarCampos,
], updateTask);

router.delete('/:id', [
    check('id', 'El ID debe ser un identificador válido').isMongoId(),
    validarCampos,
], deleteTask);

module.exports = router;

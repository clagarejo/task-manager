const path = require('path')
const express = require('express')
const  dbConnection  = require('./database/config')
const cors = require('cors')
require('dotenv').config()
const PORT = 3000

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

//CORS
app.use(cors())

// Directorio publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/tasks', require('./routes/task'))


// Escuchar las peticiones
app.listen(PORT, () => {
    console.log(`servidor corriendo en ${PORT}`)
})
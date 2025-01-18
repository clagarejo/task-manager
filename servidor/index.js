const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config');
const app = express();
const port = 3000;
require('dotenv').config()

const taskRoutes = require('./routes');

app.use(cors());
app.use(express.json());

connectDB();

app.use(taskRoutes);

app.listen(port, () => {
    console.log(`Backend corriendo en http://localhost:${port}`);
});

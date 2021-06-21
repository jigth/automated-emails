require('dotenv').config();
require('./database');
require('./periodic-tasks/check-date');

const express = require('express');
const app = express();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));


// Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

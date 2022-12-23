const express = require('express');

// Import our modular routers for /dbroutes
const dbRouter = require('./db');

const app = express();

app.use('/notes', dbRouter);

module.exports = app;
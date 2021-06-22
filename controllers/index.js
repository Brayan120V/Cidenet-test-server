import express from 'express';

const app = express();

/* Set the previous route for employee endpoints */
app.use('/employee', require('./employee'));

module.exports = app;

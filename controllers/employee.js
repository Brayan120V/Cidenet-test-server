import express from 'express';
import Sequelize from 'sequelize';
import Employee from '../models/employee';
import asyncHandler from '../utils/asyncHandler';

const app = express();

app.post('/create', asyncHandler(async (req, res) => {
  const employee = await Employee.save(req.body);
  res.status(201).json({ ok: true, employee });
}));

app.get('/list', asyncHandler(async (req, res) => {
  /* Object for box the query */
  const query = {};

  /* Array with the properties that can be used in the query */
  const permission = ['name', 'other_name', 'surname', 'second_surname',
    'identification_type', 'identification_number', 'country', 'email', 'status'];

  /* Evaluates if there is information in each element of the permission Array */
  permission.forEach((e) => {
    if (req.query[e]) {
      query[e] = { [Sequelize.Op.like]: `${req.query[e]}%` };
    }
  });

  /* Const for calculate the number of employees to ignore */
  const offset = (req.query.offset) ? Number(req.query.offset - 1) : 0;

  /* Const for set the number of employees to send */
  const limit = (req.query.limit < 10) ? Number(req.query.limit) : 10;

  const employee = await Employee.list(query, offset * limit, limit);
  res.status(200).json({ ok: true, employee });
}));

app.put('/update/:id', asyncHandler(async (req, res) => {
  /* Deletes the status and created_at properties to evite that the user update its */
  delete req.body.status;
  delete req.body.created_at;
  
  const employee = await Employee.edit({ id: req.params.id }, req.body);
  res.status(201).json({ ok: true, employee });
}));

app.delete('/delete/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.delete({ id: req.params.id });
  res.status(200).json({ ok: true, employee });
}));

app.get('/count', asyncHandler(async (req, res) => {
  const count = await Employee.counter(req.body);
  res.status(200).json({ ok: true, count });
}));

module.exports = app;

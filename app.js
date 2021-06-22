import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import controllers from './controllers/index';
import logger from './utils/logger';
import db from './database';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', controllers);

db.authenticate()
  .then(() => logger.info('Database connected'))
  .catch(err => new Error(err));

app.use((req, res, next) => {
  const err = Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.code || 400);
  res.json({ ok: false, err: err.message });
});

module.exports = app;

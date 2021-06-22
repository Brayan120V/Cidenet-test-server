import app from './app.js';
import logger from './utils/logger';

const port = 3000;

const server = app.listen(process.env.PORT || port, () => {
  logger.info('Server running');
});

module.exports = server;

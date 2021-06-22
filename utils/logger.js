import { createLogger, format, transports } from 'winston';

export default createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.simple(),
    format.timestamp(),
    format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`),
  ),
  transports: [
    new transports.File({
      maxFiles: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});

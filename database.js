import { Sequelize } from 'sequelize';
require('./config/config');

export default new Sequelize(
  process.env.DATABASE_URL,
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_cli',
    },
    logging: false,
  },
);

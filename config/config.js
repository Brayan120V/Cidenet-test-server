require('dotenv').config();

/* Select the URL by environment for the connection */

if (process.env.NODE_ENV === 'production') {
  process.env.DATABASE_URL = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  process.env.DATABASE_URL = process.env.DB_TEST;
} else if (process.env.NODE_ENV === 'development') {
  process.env.DATABASE_URL = process.env.DB_DEVELOPMENT;
} else {
  throw new Error('Connection failed');
}

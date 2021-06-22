# Cidenet server

## Project Setup

```bash
    $ npm i 
```

### Create the databases

* Open seeders/seed.sql to see the databases necesaries for run tests and the dev environment

### Connect with the database

* Go to .env and put the information necessary to connect

```
DB_TEST=postgresql://USER:PASSWORD@HOST:PORT/testcidenet
DB_DEVELOPMENT=postgresql://USER:PASSWORD@HOST:PORT/developmentcidenet
```

### Run unit tests

```bash 
    $ npm run test
```

### Run coverage tests 

```bash 
    $ npm run test:coverage
```

### Run dev server

```bash 
    $ npm run dev
```

### Trubleshoting: 

* test or dev doesn't run: 

Please verify that your node version is > 10.0, seeders for PostgreSQL are created and the credentials are correct

### After of run coverage tests see the the index.html in coverage dir

* ./coverage/Icov-report/index.html

### Lints and fixes files
```
npm run lint:fix
```




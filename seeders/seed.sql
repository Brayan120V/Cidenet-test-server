CREATE DATABASE testcidenet;
\c testcidenet;
BEGIN TRANSACTION;
CREATE TYPE country_type AS enum ('Colombia', 'Estados Unidos');
CREATE TYPE identification_type AS enum (
  'Cedula de Ciudadania',
  'Cedula de Extranjeria',
  'Pasaporte',
  'Permiso Especial'
);
CREATE TYPE area_type AS enum (
  'Administracion',
  'Financiera',
  'Compras',
  'Infraestructura',
  'Operacion',
  'Talento Humano',
  'Servicios Varios'
);
CREATE TYPE status_type AS enum ('Active');
CREATE TABLE employees(
  id serial,
  surname VARCHAR(20) NOT NULL CHECK (surname ~ '^[A-Z\s]*$'),
  second_surname VARCHAR(20) NOT NULL CHECK (second_surname ~ '^[A-Z\s]*$'),
  name VARCHAR(20) NOT NULL CHECK (name ~ '^[A-Z]*$'),
  other_name VARCHAR(50) CHECK (other_name ~ '^[A-Z\s]*$'),
  country country_type NOT NULL,
  identification_type identification_type NOT NULL,
  identification_number VARCHAR(20) NOT NULL CHECK (identification_number ~ '^[a-zA-Z0-9\-]*$'),
  email VARCHAR(300) NOT NULL UNIQUE,
  entry_at DATE NOT NULL CHECK (
    entry_at > CURRENT_DATE - interval '1 month'
    AND entry_at <= CURRENT_DATE
  ),
  area area_type NOT NULL,
  status status_type default 'Active',
  created_at TIMESTAMP NOT NULL default NOW(),
  updated_at TIMESTAMP,
  UNIQUE(identification_type, identification_number),
  primary key(id)
);
COMMIT;
CREATE DATABASE developmentcidenet;
\c developmentcidenet;
BEGIN TRANSACTION;
CREATE TYPE country_type AS enum ('Colombia', 'Estados Unidos');
CREATE TYPE identification_type AS enum (
  'Cedula de Ciudadania',
  'Cedula de Extranjeria',
  'Pasaporte',
  'Permiso Especial'
);
CREATE TYPE area_type AS enum (
  'Administracion',
  'Financiera',
  'Compras',
  'Infraestructura',
  'Operacion',
  'Talento Humano',
  'Servicios Varios'
);
CREATE TYPE status_type AS enum ('Active');
CREATE TABLE employees(
  id serial,
  surname VARCHAR(20) NOT NULL CHECK (surname ~ '^[A-Z\s]*$'),
  second_surname VARCHAR(20) NOT NULL CHECK (second_surname ~ '^[A-Z\s]*$'),
  name VARCHAR(20) NOT NULL CHECK (name ~ '^[A-Z]*$'),
  other_name VARCHAR(50) CHECK (other_name ~ '^[A-Z\s]*$'),
  country country_type NOT NULL,
  identification_type identification_type NOT NULL,
  identification_number VARCHAR(20) NOT NULL CHECK (identification_number ~ '^[a-zA-Z0-9\-]*$'),
  email VARCHAR(300) NOT NULL UNIQUE,
  entry_at DATE NOT NULL CHECK (
    entry_at > CURRENT_DATE - interval '1 month'
    AND entry_at <= CURRENT_DATE
  ),
  area area_type NOT NULL,
  status status_type default 'Active',
  created_at TIMESTAMP NOT NULL default NOW(),
  updated_at TIMESTAMP,
  UNIQUE(identification_type, identification_number),
  primary key(id)
);
COMMIT;
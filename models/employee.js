import Sequelize, { DataTypes, NOW } from 'sequelize';
import db from '../database';

/* Defines the employee model */
const Employee = db.define('employee', {
  surname: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: /^[A-Z\s]*$/g
    }
  },
  second_surname: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: /^[A-Z\s]*$/g
    }
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: /^[A-Z]*$/g
    }
  },
  other_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      is: /^[A-Z\s]*$/g
    }
  },
  country: {
    type: DataTypes.STRING,
    /* values: ['Colombia', 'Estados Unidos'], */
    allowNull: false
  },
  identification_type: {
    type: DataTypes.ENUM,
    values: ['Cedula de Ciudadania',
      'Cedula de Extranjeria',
      'Pasaporte',
      'Permiso Especial'],
    allowNull: false
  },
  identification_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\-]*$/g
    }
  },
  email: {
    type: DataTypes.STRING(300),
    validate: {
      isEmail: true
    }
  },
  entry_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  area: {
    type: DataTypes.ENUM,
    values: ['Administracion',
      'Financiera',
      'Compras',
      'Infraestructura',
      'Operacion',
      'Talento Humano',
      'Servicios Varios'],
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Active'],
    defaultValue: 'Active',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW(),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    timestamps: false
  }
},
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['identification_type', 'identification_number'],
      }
    ]
  });

/*
 * Before validate the data, the email will be created
 * @params employee
 *        is the employee that send the controller method
 * @return 
 *        continue the flow
 */
Employee.beforeValidate(async (employee) => {
  /* If the data necesaries to find and create an email is null, the hook continue the flow */
  if (!employee.name || !employee.surname || !employee.country) {
    return;
  };

  /* Creates the user for the email with the employees name and surname */
  const user = `${(employee.name).toLowerCase()}.${(employee.surname).split(' ').join('').toLowerCase()}`;

  /* Creates the extension for the email with the employees country */
  const extension = (employee.country === 'Colombia') ? 'co' : 'us';
  
  /* Finds if exists any employee with equals email user and extension */
  const exists = await Employee.find({
    email: { [Sequelize.Op.like]: `${user}%.${extension}` },
  });

  /* 
   * if exists the email, is necesary make some things
   * else asigns the email with the user and extension default 
   */
  if (exists.length > 0) {

    /*
     * @params e
     *        employee who will filter
     * @return emailsFiltered
     *        the emails users that were filtered by Regex expression
     * @return emailsFiltered
     *        the emals users that were filtered by the value null
     */
    let emailsFiltered = exists
      .map((e) => {
        /* Gets all the email user */
        let userNameEmail = e.email.split('@');

        /* Regex to filter the employee email user */
        let filter = new RegExp(`(${user})$|(${user}.([0-9]+))`, "g");

        /*
         * Verify if the statement is trust, for example andrey.vargas
         * exist andrey.vargass 
         *              false
         * exist andrey.vargas 
         *              true
         * exist andrey.vargassss
         *              false
         */
        return filter.exec(userNameEmail[0]);
      }).filter((e) => e != null);
    /* 
     * If emilsFiltered has not content, means that is the first email with user andrey.vargas 
     *          asigns the email with the user and extension default 
     * else if emailsFiltered has one element, means that is second email with user andrey.vargas
     *          asigns the email with the user.1 and extension default
     * else emailsFiltered has many elements, means there are diferent user.number emails
     *          finds the high number and asigns the email with the user.number and extension default
     */

    if (emailsFiltered.length === 0) {
      employee.email = `${user}@cidenet.com.${extension}`
    } else if (emailsFiltered.length === 1 && emailsFiltered[0][3] === undefined) {
      employee.email = `${user}.1@cidenet.com.${extension}`;
    } else if (emailsFiltered.length > 1 || emailsFiltered[0][3]) {
      /*
       * @params e
       *        employee who will filter
       * @return emailsFiltered
       *        the number partner email 
       * @params a, b
       *        numbers needed to sort the elements
       * @return emailsFiltered
       *        sorts the elements greater to less
       */
      emailsFiltered = emailsFiltered
        .map((e) => Number(e[3]))
        .sort((a, b) => b - a);

      /*
       * @params e
       *        element who will filter
       * @return emailsFiltered
       *        the numbers that were filtered by the value no isNaN
       */
      emailsFiltered = emailsFiltered.filter((e) => !isNaN(e))

      employee.email = `${user}.${++emailsFiltered[0]}@cidenet.com.${extension}`;
    }
  } else {
    employee.email = `${user}@cidenet.com.${extension}`
  }
});

Employee.save = async function createEmployee(employee) {
  return await this.create(employee);
}

Employee.list = async function listEmployees(query, offset, limit) {
  return await this.findAll({
    where: query, offset, limit,
    order: [['id', 'ASC']]
  });
}

Employee.find = async function findEmployees(query) {
  return await this.findAll({
    attributes: ['id', 'email'],
    where: query,
  });
}

Employee.edit = async function updateEmployee(query, employee) {
  /* Sets updated_at with the current date and time */
  employee.updated_at = Date.now();

  return await this.update(employee, { where: query, returning: true });
}

Employee.delete = async function deleteEmployee(query) {
  return await this.destroy({ where: query });
}

Employee.counter = async function countEmployees() {
  return await this.count();
}

export default Employee;

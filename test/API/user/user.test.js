import request from 'supertest';
import app from '../../../app';

describe('Employee', () => {
  let server;
  const port = 3000;

  const employee = {
    name: "ANDREY",
    other_name: "",
    surname: "VARGAS",
    second_surname: "BECERRA",
    country: "Colombia",
    identification_type: "Cedula de Ciudadania",
    identification_number: "10EH",
    area: "Administracion",
    entry_at: Date.now(),
  };

  beforeAll((done) => {
    server = app.listen(process.env.PORT || port);
    done();
  });

  afterAll(async (done) => {
    server.close();
    done();
  });


  it('Should create an employee and return the document', async (done) => {
    const res = await request(server)
      .post('/api/v1/employee/create')
      .send(employee);

    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ ok: true, employee: expect.any(Object) });

    employee.id = res.body.employee.id;

    done();
  });

  it('Should list employees', async (done) => {
    const res = await request(server)
      .get(`/api/v1/employee/list`);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ ok: true, employee: expect.any(Array) });

    done();
  });

  it('Should update an employee by id', async (done) => {
    const res = await request(server)
      .put(`/api/v1/employee/update/${employee.id}`)
      .send({ area: 'Financiera' });

    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ ok: true, employee: expect.any(Object) });

    employee.area = res.body.employee.area;

    done();
  });

  it('Should delete an employee by id', async (done) => {
    const res = await request(server)
      .delete(`/api/v1/employee/delete/${employee.id}`)

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ ok: true, employee: 1 });

    done();
  });
});

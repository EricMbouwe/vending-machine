const { app } = require('../../app');
const request = require('supertest');

describe('AUTH/USER', () => {
  test('POST /auth/register -> It responds with 201, user created', async () => {
    const rand = Math.random();
    const data = {
      username: 'edou' + rand.toString(),
      password: 'azerty',
      roleId: 1,
    };

    await request(app)
      .post('/auth/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });

  test('POST /auth/register -> It responds with 400, user not created', async () => {
    const data = {
      userna: 'edou',
      password: 'azerty',
      roleId: 1,
    };

    await request(app)
      .post('/auth/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('POST /auth/login -> It responds with 200, user logged in', async () => {
    const data = {
      username: 'thomas',
      password: '123456',
    };

    await request(app)
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('POST /auth/login -> It responds with 401, user not authenticated', async () => {
    const data = {
      username: 'edou',
      password: 'azereo',
    };

    await request(app)
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect(401);
  });

  test('GET /auth/user -> It responds with 200, logged in user', async () => {
    const data = {
      username: 'edou',
      password: 'azerty',
    };

    // login first  with the data and next

    await request(app)
      .get('/auth/user')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('GET /auth/user -> It responds with 404, user not found', async () => {
    const data = {
      username: 'edou',
      password: 'azerty',
    };

    // login first  with the data and next

    await request(app)
      .get('/auth/user')
      .send(data)
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('DELETE /logout -> It responds with 204, user logged out', async () => {
    const data = {
      username: 'edou',
      password: 'azerty',
    };

    // login first  with the data and next

    await request(app)
      .delete('/logout')
      .set('Cookie', null)
      .set('Accept', 'application/json')
      .expect(204);
  });
});

const { app } = require('../../app');
const request = require('supertest');

// let cookie;
// cookie = response.headers['set-cookie'];

describe('AUTH/USER', () => {
  test('It responds with 201, user created', async () => {
    const rand = Math.random();
    const data = {
      username: 'edou' + rand.toString(),
      password: 'azerty',
      roleId: 1,
    };

    const response = await request(app)
      .post('/auth/register')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
  });

  test('It responds with 400, user not created', async () => {
    const data = {
      userna: 'edou',
      password: 'azerty',
      roleId: 1,
    };

    const response = await request(app)
      .post('/auth/register')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(400);
  });
});

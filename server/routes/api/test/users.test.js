const { app } = require('../../../app');
const request = require('supertest');

let cookie;
const buyer = request.agent(app);

beforeAll((done) => {
  buyer
    .post('/auth/login')
    .send({ username: 'santiago', password: '123456' })
    .end((err, response) => {
      cookie = response.headers['set-cookie'];
      done();
    });
});

describe('API/USERS', () => {
  test('It should require authentication if not authenticated', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(401);
  });

  test('It responds with JSON if authenticated', () => {
    return buyer
      .get('/api/users')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});

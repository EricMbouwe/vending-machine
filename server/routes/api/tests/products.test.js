const { app } = require('../../../app');
const request = require('supertest');

let cookie;
const seller = request.agent(app);
const buyer = request.agent(app);

beforeAll((done) => {
  seller
    .post('/auth/login')
    .send({ username: 'thomas', password: '123456' })
    .end((err, response) => {
      console.log('RESPONSE', response.body);
      cookie = response.headers['set-cookie'];
      done();
    });
});

describe('API/PRODUCTS', () => {
  // Token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return seller.get('/api/products').then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });

  // Send the token - should respond with a 200
  test('It responds with JSON', () => {
    return seller
      .get('/api/products')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  it('GET /api/products -> array of products', () => {
    return seller
      .get('/api/products')
      .set('Cookie', cookie)
      .expect('Content-type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              productName: expect.any(String),
              cost: expect.any(Number),
              sellerId: expect.any(Number),
            }),
          ]),
        );
      });
  });
});

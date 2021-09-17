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
      cookie = response.headers['set-cookie'];
      done();
    });

  buyer
    .post('/auth/login')
    .send({ username: 'santiago', password: '123456' })
    .end((err, response) => {
      cookie = response.headers['set-cookie'];
      done();
    });
});

describe('API/PRODUCTS', () => {
  // Token not being sent - should respond with a 401
  test('It should require authentication from anonymous request', () => {
    return request(app)
      .get('/api/products')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  // Token not being sent - should respond with a 401
  test('It should require authentication from a seller user', () => {
    return seller.get('/api/products').then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });

  // Token not being sent - should respond with a 401
  test('It should require authentication from a buyer user', () => {
    return seller.get('/api/products').then((response) => {
      expect(response.statusCode).toBe(401);
    });
  });

  // Send the token - should respond with a 200
  test('It responds with JSON from a seller user request', () => {
    return seller
      .get('/api/products')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  test('It responds with JSON from a seller buyer request', () => {
    return buyer
      .get('/api/products')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  test('Seller GET /api/products -> array of products', () => {
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

  test('Buyer GET /api/products -> array of products', () => {
    return buyer
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

const { app } = require('../../../app');
const request = require('supertest');

let cookie;
const seller = request.agent(app);
const buyer = request.agent(app);
let eric3;

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

  // request(app)
  //   .post('/auth/register')
  //   .send({ username: 'eric9', password: 'azerty', roleId: 1 })
  //   .end((err, response) => {
  //     eric = response.body;
  //     done();
  //   });
});

describe('API/PRODUCTS', () => {
  test('It should require authentication from anonymous request', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(401);
  });

  // Token not being sent - should respond with a 401
  test('It should require authentication from a seller user', async () => {
    const response = await seller.get('/api/products');
    expect(response.statusCode).toBe(401);
  });

  test('It should require authentication from a buyer user', async () => {
    const response = await seller.get('/api/products');
    expect(response.statusCode).toBe(401);
  });

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

  test('Seller GET /api/products -> array of products', async () => {
    const response = await seller
      .get('/api/products')
      .set('Cookie', cookie)
      .expect('Content-type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productName: expect.any(String),
          cost: expect.any(Number),
          sellerId: expect.any(Number),
        }),
      ]),
    );
  });

  test('Buyer GET /api/products -> array of products', async () => {
    const response = await buyer
      .get('/api/products')
      .set('Cookie', cookie)
      .expect('Content-type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productName: expect.any(String),
          cost: expect.any(Number),
          sellerId: expect.any(Number),
        }),
      ]),
    );
  });

  test("GET seller's products by sellerId /api/products/seller/sellerId -> array of products", async () => {
    const response = await seller
      .get('/api/products/seller/1')
      .set('Cookie', cookie)
      .expect('Content-type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productName: expect.any(String),
          cost: expect.any(Number),
          sellerId: 1,
        }),
      ]),
    );
  });
});

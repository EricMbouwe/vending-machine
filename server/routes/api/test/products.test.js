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
  test('It should require authentication if not authenticated', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(401);
    expect(response.type).not.toBe('application/json');
  });

  test('It should require authentication if not authenticated', async () => {
    const response = await seller
      .get('/api/products')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(401);
    expect(response.type).not.toBe('application/json');
  });

  test('It should require authentication if not authenticated', async () => {
    const response = await seller
      .get('/api/products')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(401);
    expect(response.type).not.toBe('application/json');
  });

  test('It responds with JSON if authenticated', () => {
    return seller
      .get('/api/products')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  test('It responds with JSON if authenticated', () => {
    return buyer
      .get('/api/products')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  test('GET /api/products -> Array of products', async () => {
    const response = await seller
      .get('/api/products')
      .set('Accept', 'application/json')
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

  test('GET /api/products -> Array of products', async () => {
    const response = await buyer
      .get('/api/products')
      .set('Accept', 'application/json')
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

  test('GET /api/products/seller/sellerId -> Array of products', async () => {
    const response = await seller
      .get('/api/products/seller/1')
      .set('Accept', 'application/json')
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

  test('GET /api/products/seller/sellerId -> 404 if seller user not found', async () => {
    const response = await seller
      .get('/api/products/seller/9999')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .expect('Content-type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          status: 404,
          message: expect.any(String),
        }),
      }),
    );
  });

  test('POST /api/products/ -> Created product', async () => {
    const response = await seller
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .send({ productName: 'coca-cola', cost: 345 })
      .expect('Content-type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: 'coca-cola',
      cost: 345,
      sellerId: expect.any(Number),
    });
  });

  test('POST /api/products/ -> Not allowed if not seller', async () => {
    const response = await seller
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .send({ productName: 'coca-cola', cost: 345 })
      .expect('Content-type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: 'coca-cola',
      cost: 345,
      sellerId: expect.any(Number),
    });
  });

  test('PUT /api/products/productId -> Updated product', async () => {
    const response = await seller
      .put('/api/products/1')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .send({ productName: 'coca-cola', cost: 345 })
      .expect('Content-type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: 'coca-cola',
      cost: 345,
      sellerId: expect.any(Number),
    });
  });

  test('PUT /api/products/productId -> Not allowed if not seller', async () => {
    const response = await seller
      .put('/api/products/1')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .send({ productName: 'coca-cola', cost: 345 })
      .expect('Content-type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: 'coca-cola',
      cost: 345,
      sellerId: expect.any(Number),
    });
  });

  test('DELETE /api/products/productId -> Deleted product', async () => {
    const response = await seller
      .delete('/api/products/1')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .send({ productName: 'coca-cola', cost: 345 })
      .expect('Content-type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: 'coca-cola',
      cost: 345,
      sellerId: expect.any(Number),
    });
  });

  test('DELETE /api/products/productId -> Not Allowed if not seller', async () => {
    const response = await seller
      .delete('/api/products/1')
      .set('Accept', 'application/json')
      .set('Cookie', cookie)
      .send({ productName: 'coca-cola', cost: 345 })
      .expect('Content-type', /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      productName: 'coca-cola',
      cost: 345,
      sellerId: expect.any(Number),
    });
  });
});

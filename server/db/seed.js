const db = require('./db');
const { User, Product, Role } = require('./models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  await User.create({
    username: 'dan',
    password: '123456',
    roleId: 2,
    role: 'seller',
  });

  await User.create({
    username: 'ben',
    password: '123456',
  });

  await Product.create({
    productName: 'beef',
    cost: 368,
    sellerId: 1,
    amountAvailable: 1,
  });

  await Product.create({
    productName: 'tomato',
    cost: 345,
    sellerId: 1,
    amountAvailable: 1,
  });

  await Product.create({
    productName: 'coconut',
    cost: 185,
    sellerId: 2,
    amountAvailable: 1,
  });

  await Product.create({
    productName: 'tea',
    cost: 285,
    sellerId: 2,
    amountAvailable: 1,
  });

  await Role.create({
    name: 'buyer',
  });

  await Role.create({
    name: 'seller',
  });

  await Role.create({
    name: 'admin',
  });

  console.log(`seeded users, products and roles`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

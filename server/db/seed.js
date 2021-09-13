const db = require('./db');
const { User, Product, Role } = require('./models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const thomas = await User.create({
    username: 'thomas',
    password: '123456',
  });

  const santiago = await User.create({
    username: 'santiago',
    password: '123456',
  });

  const chiumbo = await User.create({
    username: 'chiumbo',
    password: '123456',
  });

  const hualing = await User.create({
    username: 'hualing',
    password: '123456',
  });

  const beef = await Product.create({
    productName: 'beef',
    cost: 368,
    sellerId: 1,
    amountAvailable: 1,
  });

  const tomato = await Product.create({
    productName: 'tomato',
    cost: 345,
    sellerId: 1,
    amountAvailable: 1,
  });

  const coconut = await Product.create({
    productName: 'coconut',
    cost: 185,
    sellerId: 2,
    amountAvailable: 1,
  });

  const buyer = await Role.create({
    name: 'buyer',
  });

  const seller = await Role.create({
    name: 'seller',
  });

  const admin = await Role.create({
    name: 'admin',
  });

  // const defaultRole = await Role.create({});

  console.log(`seeded users and products`);
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

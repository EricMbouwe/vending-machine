const db = require("./db");
const { User } = require("./models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const thomas = await User.create({
    username: "thomas",
    password: "123456",
    deposit: 75,
  });

  const santiago = await User.create({
    username: "santiago",
    password: "123456",
    deposit: 75,
  });

  const chiumbo = await User.create({
    username: "chiumbo",
    password: "123456",
    deposit: 75,
  });

 
  const hualing = await User.create({
    username: "hualing",
    password: "123456",
    deposit: 75,
  });

  console.log(`seeded users and products`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

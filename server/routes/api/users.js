const router = require('express').Router();
const { User, Product } = require('../../db/models');
const { Op } = require('sequelize');

// find user by username
router.get('/:username', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const { username } = req.params;

    const user = await User.findOne({
      where: {
        username: {
          [Op.substring]: username,
        },
      },
    });

    if (!user) {
      return res.send('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// find all users
router.get('/', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const users = await User.findAll();

    if (users.length < 1) return res.send('No user found');

    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Make a deposit
router.post('/deposit', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const { amount } = req.body;
    const user = req.user;

    if (!amount) return res.send('Enter an amount');
    user.deposit = amount;

    res.json(user.dataValues);
  } catch (error) {
    next(error);
  }
});

// reset a deposit
router.post('/reset', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const user = req.user;

    let returnedMoney = user.dispenseCoins(user.deposit, [100, 50, 20, 10, 5]);
    user.deposit = 0;
    await user.save();

    res.json({
      ...user.dataValues,
      returnedMoney,
    });
  } catch (error) {
    next(error);
  }
});

// Make a purchase
router.post('/buy', async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.sendStatus(401);
    // }

    const user = req.user;
    let totalSpent = 0;
    let returnedMoney = undefined;
    let reminder = 0;
    const productsList = [];

    const { productId, quantity } = req.body;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    const { cost } = product;

    totalSpent = cost * quantity;
    reminder = user.deposit - totalSpent;
    productsList.push(product);

    const count = await Product.calculateAvailableAmount(product);
    product.amountAvailable = count - quantity;

    returnedMoney = user.dispenseCoins(reminder, [100, 50, 20, 10, 5]);

    user.update({ deposit: 0 });

    res.json({
      ...user.dataValues,
      returnedMoney,
      totalSpent,
      productsList,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

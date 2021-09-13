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
    // const user = req.user;
    const user = await User.findOne({
      where: {
        id: 1,
      },
    });

    if (!amount) return res.send('Amount is required');
    if (user.deposit > 0) {
      return res.send(
        'Your account is already filled, make a purchase or reset your deposit to continue',
      );
    }

    user.update({ deposit: amount });

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

    // const user = req.user;
    const user = await User.findOne({
      where: {
        id: 1,
      },
    });

    let returnedMoney = user.dispenseCoins(user.deposit, [100, 50, 20, 10, 5]);

    user.update({ deposit: 0 });

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

    // const user = req.user;
    const user = await User.findOne({
      where: {
        username: 'thomas',
      },
    });

    let totalSpent = 0;
    let reminder = 0;
    const productsList = [];

    const { productId, quantity } = req.body;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) return res.send('Sorry this product is not available');

    const { count, rows } = await Product.findAndCountAll({
      where: {
        productName: product.productName,
        cost: product.cost,
      },
    });

    if (quantity > count)
      return res.send(
        `Sorry there is only ${count} ${product.productName} available`,
      );

    const { cost } = product;

    totalSpent = cost * quantity;
    reminder = user.deposit - totalSpent;

    if (reminder < 0)
      return res.send("Sorry you don't have enougth money to buy this product");

    for (let i = 0; i < quantity; i++) {
      await Product.destroy({
        where: {
          id: rows[i].id,
        },
      });
      rows[i].update({ amountAvailable: count - quantity });
      productsList.push(rows[i]);
    }

    //update remaining product available quantity
    for (let i = 0; i < count; i++) {
      rows[i].update({ amountAvailable: count - quantity });
    }

    const returnedMoney = user.dispenseCoins(reminder, [100, 50, 20, 10, 5]);

    // user.update({ deposit: 0 });

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

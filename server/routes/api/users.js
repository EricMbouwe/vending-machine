const router = require('express').Router();
const { User, Product, Role } = require('../../db/models');
const { Op } = require('sequelize');
const { authRole } = require('../../authHelper');

// find user by username
router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      where: {
        username: {
          [Op.substring]: username,
        },
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: 'The user with the given id does not exist!' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// find all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();

    if (users.length < 1) return res.send('No user found');

    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Make a deposit
router.post('/deposit', authRole('buyer'), async (req, res, next) => {
  try {
    const user = req.user;

    const { amount } = req.body;
    const denominations = [100, 50, 20, 10, 5];

    if (!denominations.includes(amount)) {
      console.log({ error: 'This amount is not allowed' });
      return res.status(403).json({ error: 'This amount is not allowed' });
    }

    const newAmount = user.deposit + amount;
    user.update({ deposit: newAmount });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// reset a deposit
router.post('/reset', authRole('buyer'), async (req, res, next) => {
  try {
    const user = req.user;

    if (user.deposit === 0) {
      return res.send(user);
    }

    const returnedMoney = user.dispenseCoins(
      user.deposit,
      [100, 50, 20, 10, 5],
    );

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
router.post('/buy', authRole('buyer'), async (req, res, next) => {
  try {
    const user = req.user;

    let totalSpent = 0;
    let reminder = 0;
    const productsList = [];

    const { productId, quantity } = req.body;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      console.log({
        error: 'Sorry the product with the given id is not available',
      });

      return res.status(404).json({
        error: 'Sorry the product with the given id is not available',
      });
    }

    const { cost } = product;

    totalSpent = cost * quantity;
    reminder = user.deposit - totalSpent;

    if (reminder < 0) {
      console.log({
        error:
          "Sorry you don't have enougth money to buy this/these product(s)",
      });

      return res.status(403).json({
        error:
          "Sorry you don't have enougth money to buy this/these product(s)",
      });
    }

    // Get all the products of that name and cost in the global store
    const { count, rows } = await Product.findAndCountAll({
      where: {
        productName: product.productName,
        cost: product.cost,
      },
    });

    if (quantity > count) {
      console.log({
        error: `Sorry there is only ${count} unit(s) of ${product.productName} available`,
      });

      return res.status(403).json({
        error: `Sorry there is only ${count} unit(s) of ${product.productName} available`,
      });
    }

    const remainingQuantity = count - quantity;

    for (let i = 0; i < quantity; i++) {
      await Product.destroy({
        where: {
          id: rows[i].id,
        },
      });
      rows[i].update({ amountAvailable: remainingQuantity });
      productsList.push(rows[i]);
    }

    // Update remaining product available quantity
    for (let i = 0; i < remainingQuantity; i++) {
      rows[i].update({ amountAvailable: remainingQuantity });
    }

    const returnedMoney = user.dispenseCoins(reminder, [100, 50, 20, 10, 5]);

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

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
    const users = await User.findAll();

    if (users.length < 1) return res.send('No user found');

    for (user of users) {
      const roleId = user.roleId;
      const role = await Role.getRoleName(roleId);
      user.update({ role: role });
    }

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

    // Update remaining product available quantity
    for (let i = 0; i < count; i++) {
      rows[i].update({ amountAvailable: count - quantity });
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

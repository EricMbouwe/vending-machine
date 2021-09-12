const router = require('express').Router();
const { User } = require('../../db/models');
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

module.exports = router;

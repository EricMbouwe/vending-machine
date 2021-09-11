const router = require('express').Router();
const { User } = require('../../db/models');
const { Op } = require('sequelize');

// find users by username
router.get('/:username', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username,
        },
        id: {
          [Op.not]: req.user.id,
        },
      },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

// find all users
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

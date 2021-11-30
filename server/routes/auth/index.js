require('dotenv').config();

const router = require('express').Router();
const { User, Role } = require('../../db/models');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  const userData = {
    id: user.dataValues.id,
    username: user.dataValues.username,
    role: user.dataValues.role,
  };

  return jwt.sign(userData, process.env.SESSION_SECRET, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, roleId } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.create(req.body);

    const token = generateAccessToken(user);

    const role = await Role.getRoleName(roleId);
    user.update({ role: role });

    res.status(201).json({ ...user.dataValues, token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log({ error: 'User already exists' });
      return res.status(422).json({ error: 'User already exists' });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(422).json({ error: 'Validation error' });
    } else next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Username and password required' });

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      res.status(401).json({ error: 'Wrong username and/or password' });
    } else if (!user.correctPassword(password)) {
      console.log({ error: 'Wrong username and/or password' });
      res.status(401).json({ error: 'Wrong username and/or password' });
    } else {
      const token = generateAccessToken(user);

      res.json({ ...user.dataValues, token });
    }
  } catch (error) {
    next(error);
  }
});

// Logout the user
router.delete('/logout', (req, res, next) => {
  if (req.user) {
    return res.clearCookie('token').sendStatus(204);
  } else {
    return res.status(404).send({ error: 'No Logged User' });
  }
});

// Get the logged in user
router.get('/user', (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(404).send({ error: 'No Logged User' });
  }
});

module.exports = router;

// router.post('/token', (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken: accessToken });
//   });
// });

// router.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   res.sendStatus(204);
// });

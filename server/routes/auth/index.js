require('dotenv').config();

const router = require('express').Router();
const { User, Role } = require('../../db/models');
const jwt = require('jsonwebtoken');

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

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 86400 },
    );

    if (!req.cookies || !req.cookies.token) {
      res.setHeader('Set-Cookie', `token=${token};HttpOnly;`);
      // res.cookie('token', token, {
      //   sameSite: true,
      //   secure: true,
      //   maxAge: 86400000,
      //   httpOnly: true,
      // });
    }

    const role = await Role.getRoleName(roleId);
    user.update({ role: role });

    res.status(201).json({ ...user.dataValues, token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return next({ status: 422, message: 'User already exists' });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(422).json({ error: 'Validation error' });
    } else next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // expects username and password in req.body
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
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.SESSION_SECRET,
        { expiresIn: 86400 },
      );

      if (!req.cookies || !req.cookies.token) {
        res.setHeader('Set-Cookie', `token=${token};HttpOnly;`);
        // res.cookie('token', token, {
        //   sameSite: true,
        //   secure: true,
        //   maxAge: 86400000,
        //   httpOnly: true,
        // });
      }

      res.json({ ...user.dataValues, token });
    }
  } catch (error) {
    next(error);
  }
});

// Logout the user
router.delete('/logout', (req, res, next) => {
  return res.clearCookie('token').sendStatus(204);
});

// Get the logged in user
router.get('/user', (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(404).json({ message: 'No Logged User' });
  }
});

// Get roles
router.get('/roles', async (req, res, next) => {
  try {
    const roles = await Role.getRoles();

    res.json(roles);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

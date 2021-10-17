const jwt = require('jsonwebtoken');
const { User } = require('./db/models');

function authUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    return res.send({ error: 'You need to sign in' });
  }

  next();
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authToken(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decodedToken) => {
      if (err) return res.sendStatus(403);

      const user = await User.findOne({
        where: { id: decodedToken.id },
      });
      req.user = user;
      next();
    });
  } else {
    next();
  }
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(403);
      return res.send({ error: 'Not allowed' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authToken,
  authUser,
  authRole,
};

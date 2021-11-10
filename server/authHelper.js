const jwt = require('jsonwebtoken');
const { User } = require('./db/models');

function authUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    console.log('Not Authenticated');
    return res.send({ error: 'You need to sign in' });
  }

  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(403);
      console.log('Not Allowed');
      return res.send({ error: 'Not allowed' });
    }

    next();
  };
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next();

  jwt.verify(token, process.env.SESSION_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log('Invalid Token');
      return res.sendStatus(403);
    }

    const user = await User.findOne({
      where: { id: decodedToken.id },
    });

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  authUser,
  authRole,
};

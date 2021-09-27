function authUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    return res.send({ error: 'You need to sign in' });
  }

  next();
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
  authUser,
  authRole,
};

const router = require('express').Router();
const { Role } = require('../../db/models');

// Get roles
router.get('/', async (req, res, next) => {
  try {
    const roles = await Role.getRoles();

    res.json(roles);
  } catch (error) {
    next(error);
  }
});

// Add a role
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }

    const role = await Role.create({
      name,
    });

    res.json(role);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

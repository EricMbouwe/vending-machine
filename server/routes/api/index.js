const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/roles', require('./roles'));

router.use((req, res, next) => {
  next();
});

module.exports = router;

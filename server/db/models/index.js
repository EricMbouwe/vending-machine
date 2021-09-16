const Product = require('./product');
const Role = require('./role');
const User = require('./user');

// associations
User.hasMany(Product);
Product.belongsTo(User, { as: 'seller' });

module.exports = {
  User,
  Product,
  Role,
};

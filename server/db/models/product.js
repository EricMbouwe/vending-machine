const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 3,
    },
  },
  cost: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  amountAvailable: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set(value) {
      this.setDataValue('amountAvailable', value + 1);
    },
  },
});

Product.findProductsBySeller = async function (sellerId) {
  const products = await Product.findAll({
    where: {
      sellerId: {
        [Op.or]: [sellerId],
      },
    },
  });

  return products;
};

module.exports = Product;

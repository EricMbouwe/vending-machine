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
      this.setDataValue('amountAvailable', value);
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

Product.calculateAvailableAmount = async (product) => {
  return await Product.findAndCountAll({
    where: {
      productName: product.productName,
    },
  });
};

Product.updateAmountAvailableForAll = (products, count) => {
  for (let i = 0; i < count; i++) {
    products[i].update({ amountAvailable: count });
  }
};

module.exports = Product;

const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      min: 3,
    },
    get() {
      return () => this.getDataValue('productName');
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

Product.prototype.setAmountAvailable = async function () {
  const quantity = await Product.findAll({
    where: {
      productName: this.productName(),
    },
  });

  this.update({ amountAvailable: quantity });
};

// (async () => {
//   const products = await Product.findProductsBySeller(18);
//   console.log('SELLER 1 Products', JSON.stringify(products));
//   console.log('----------------');
// })();

module.exports = Product;

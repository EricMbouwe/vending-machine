const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      min: 6,
    },
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    },
  },
  deposit: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    set(value) {
      this.setDataValue('deposit', value);
    },
  },
  roleId: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'buyer',
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
});

User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password();
};

User.prototype.dispenseCoins = function (total, denominations) {
  return denominations.reduce((denominationsHash, denomination) => {
    denominationsHash[denomination] = Math.floor(total / denomination);
    total -= Math.floor(total / denomination) * denomination;
    return denominationsHash;
  }, {});
};

User.createSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainPassword, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainPassword)
    .update(salt)
    .digest('hex');
};

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;

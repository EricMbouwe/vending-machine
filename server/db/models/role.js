const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');

const Role = db.define('role', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'buyer',
    allowNull: false,
  },
});

Role.getRoleName = async (roleId) => {
  const role = await Role.findOne({
    where: {
      id: {
        [Op.or]: [roleId],
      },
    },
  });

  return role.name;
};

Role.getRoles = async () => await Role.findAll();

module.exports = Role;

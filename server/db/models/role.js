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

// (async () => {
//   console.log('-----------------');
//   const roles = await Role.getRoles();
//   console.log('ALL ROLES', JSON.stringify(roles));
//   console.log('-----------------');

//   const roleName = await Role.getRoleName(2);
//   console.log('ROLE NAME IS ', roleName);
//   console.log('-----------------');
// })();

module.exports = Role;

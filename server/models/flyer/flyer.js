const Sequelize = require('sequelize')

module.exports = sequelize => {

  const Flyer = sequelize.define(
    'Flyer',
    {
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      passwordHash: {
        type: Sequelize.STRING
      }
    },{
      tableName: 'flyers',
      paranoid: true,
      name: {
        singular: 'flyer',
        plural: 'flyers',
      },
    }
  )

  Flyer.associate = ({
    Flight
  }) => {
    Flyer.hasMany(Flight, {
      as: 'flights',
      foreignKey: 'flyer_id',
    })
  }

  return Flyer
}


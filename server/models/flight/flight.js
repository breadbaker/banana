const Sequelize = require('sequelize')

module.exports = sequelize => {

  const Flight = sequelize.define(
    'Flight',
    {
      signature: {
        type: Sequelize.TEXT,
        notEmpty: true
      },
      aircraft: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      date: {
        type: Sequelize.DATE
      },
      departingAirport: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      arrivalAirport: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      durration: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      takeoffs: {
        type: Sequelize.INTEGER
      },
      landings: {
        type: Sequelize.INTEGER
      },
      remarks: {
        type: Sequelize.TEXT
      }
    },{
      tableName: 'flights',
      paranoid: true,
      name: {
        singular: 'flight',
        plural: 'flights',
      },
    }
  )

  Flight.associate = ({
    Flyer
  }) => {
    Flight.belongsTo(Flyer, {
      as: 'flyer',
      foreignKey: 'flyer_id',
      allowNull: false,
      foreignKeyConstraint: true
    })
  }

  return Flight
}


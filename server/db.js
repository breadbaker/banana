const path = require('path')
const glob = require( 'glob' )
const tryRequire = require('try-require')

tryRequire(path.resolve(__dirname, './secret'))

require('app-module-path').addPath(path.resolve(__dirname, '..'))

const Sequelize = require('sequelize');

const DbOptions = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  debug: false,
  logging: false,
  pool: {
    max: 200,
    min: 0,
    idle: 10000,
  },
}

const DB_NAME = process.env.IS_TEST ? 'flighttest' : process.env.DB_NAME
db = new Sequelize(
  DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  DbOptions,
)

const files = glob.sync(
  './models/**/*.js', 
  { 
    ignore: ['./models/**/*.test.js', './models/**/*.faker.js']
  }
)

require('./models/flyer/flyer')(db)
require('./models/flight/flight')(db)
// files.forEach(file => {
//   require(path.resolve(file))(db)
// })

const { models } = db

Object.values(models).forEach(model => {
  model.associate(models)
})

module.exports = db

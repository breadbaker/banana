const asyncWrapper = require('middleware/async-wrapper')

const {
  storeFlight,
  retrieveFlights
} = require('@util')

module.exports = app => {
  app.post('/flight', asyncWrapper(async(req, res) => {
    storeFlight(req.body, 'dbaker')
    res.status(200).send()
  }))

  app.get('/flights', asyncWrapper(async(req, res) => {
    const flights = await retrieveFlights('dbaker')
    res.status(200).send(flights)
  }))
}

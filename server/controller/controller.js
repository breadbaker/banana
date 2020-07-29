const asyncWrapper = require('middleware/async-wrapper')

const {
  storeFlight,
  retrieveFlights
} = require('@handlers')

module.exports = app => {
  app.post('/flight', asyncWrapper(async(req, res) => {
    storeFlight({
      data: req.body,
      key: 'dbaker'
    })
    res.status(200).send()
  }))

  app.get('/flights', asyncWrapper(async(req, res) => {
    const flights = await retrieveFlights({
      key: 'dbaker'
    })
    res.status(200).send(flights)
  }))
}

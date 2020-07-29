const asyncWrapper = require('middleware/async-wrapper')

const {
  storeFlight,
  retrieveFlights
} = require('@handlers')

module.exports = app => {
  app.post('/flight', asyncWrapper(async(req, res) => {
    storeFlight({
      data: req.body.data,
      key: req.body.key
    })
    res.status(200).send()
  }))

  app.post('/flights', asyncWrapper(async(req, res) => {
    const flights = await retrieveFlights({
      key: req.body.key
    })
    res.status(200).send(flights)
  }))
}

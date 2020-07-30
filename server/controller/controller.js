const asyncWrapper = require('middleware/async-wrapper')

const {
  storeFlight,
  retrieveFlights,
  signup,
  login,
  reset,
  forgot
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

  app.post('/signup', asyncWrapper(async(req, res) => {
    // try {
      const response = await signup(req.body)
      return res.status(200).send(response)
    // } catch (err) {
    //   return res.status(400).send(err)
    // }
  }))
  
  app.post('/login', asyncWrapper(async(req, res) => {
    try {
      respons = await login(req.body)
    } catch (err) {
      return res.status(400).send(err)
    }
  }))

  app.post('/forgot', asyncWrapper(async(req, res) => {
    try {
      respons = await forgot(req.body)
    } catch (err) {
      return res.status(400).send(err)
    }
  }))

  app.post('/reset', asyncWrapper(async(req, res) => {
    try {
      respons = await signup(req.body)
    } catch (err) {
      return res.status(400).send(err)
    }
  }))
}

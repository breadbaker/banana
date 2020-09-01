const asyncWrapper = require('middleware/async-wrapper')
const {
  manageRecord,
  billing,
  signup,
  login,
  reset,
  forgot,
  validate,
  renew,
} = require('@handlers')

module.exports = app => {
  app.post('/billing', asyncWrapper(async(req, res) => {
    const response = await billing(req.body)
    res.status(200).send(response)
  }))

  app.post('/records/*', asyncWrapper(async(req, res) => {
    const response = await manageRecord(req.body)
    res.status(200).send(response)
  }))

  app.post('/validate', asyncWrapper(async(req,res) => {
    const response = await validate(req.body)
    return res.status(200).send(response)
  }))

  app.post('/renew', asyncWrapper(async(req,res) => {
    const response = await renew(req.body)
    return res.status(200).send(response)
  }))

  app.post('/signup', asyncWrapper(async(req, res) => {
    try {
      const response = await signup(req.body)
      return res.status(200).send(response)
    } catch (err) {
      return res.status(400).send(err)
    }
  }))

  app.post('/login', asyncWrapper(async(req, res) => {
    try {
      response = await login(req.body)
      return res.status(200).send(response)
    } catch (err) {
      console.log(err)
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

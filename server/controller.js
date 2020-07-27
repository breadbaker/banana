const asyncWrapper = require('middleware/async-wrapper')

const {
  models: {
    Flight
  }
} = require('@db')

const SearchProducts = require('./search-product')
module.exports = app => {
  SearchProducts().then((search) => {
    const searchProducts = search

    app.get('/search', asyncWrapper(async(req, res) => {
      try {
        const ingredients = await searchProducts(req.query.ingredient)
        res.status(200).send(ingredients)
      } catch (err) {
        res.status(400).send(err)
      }
    }))

    app.post('/flight', asyncWrapper(async(req, res) => {
      // try {
        const newFlight = await Flight.create(req.body)
        res.status(200).send(newFlight)
      // } catch (err) {
      //   res.status(400).send(err)
      // }
    }))

    app.get('/flights', asyncWrapper(async(req, res) => {
      const flights = await Flight.findAll()
      res.status(200).send(flights)
    }))
  
  })

}

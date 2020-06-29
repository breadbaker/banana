const asyncWrapper = require('middleware/async-wrapper')

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
  
  })

}

require('app-module-path').addPath(__dirname)

const express = require('express')

const app = require('./app')(express())

const port = +process.env.PORT || 5000

const SearchProducts = require('./search-product')

SearchProducts().then((search) => {

  const serachProducts = search
  app.listen(port,() => {
    console.log(`listening on ${port}`)
  })
})



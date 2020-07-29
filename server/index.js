require('app-module-path').addPath(__dirname)
var cors = require('cors')

const express = require('express')

const app = require('./app')(express())

app.use(cors())
const port = +process.env.PORT || 3000

app.listen(port,() => {
  console.log(`listening on ${port}`)
})
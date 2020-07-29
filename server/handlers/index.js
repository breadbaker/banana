const { handler: storeFlight } = require('./store-flight')
const { handler: retrieveFlights }= require('./retrieve-flights')

exports = {
    storeFlight,
    retrieveFlights
}
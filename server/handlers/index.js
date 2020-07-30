const storeFlight = require('./store-flight')
const retrieveFlights = require('./retrieve-flights')
const signup = require('./auth/signup')
const login = require('./auth/login')
const forgot = require('./auth/forgot')
const reset = require('./auth/reset')

module.exports = {
    storeFlight,
    retrieveFlights,
    signup,
    login,
    forgot,
    reset
}
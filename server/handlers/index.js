const storeFlight = require('./store-flight')
const retrieveFlights = require('./retrieve-flights')
const updateFlight = require('./update-flight')
const exportRecords = require('./export')
const signup = require('./auth/signup')
const login = require('./auth/login')
const forgot = require('./auth/forgot')
const reset = require('./auth/reset')
const renew = require('./auth/renew')
const validate = require('./auth/validate')

const withAuth = {
    retrieveFlights,
    storeFlight,
    exportRecords,
    updateFlight
}

const authMethods = Object.keys(withAuth).reduce((memo, key) => {
    const method = async event => {
        await validate(event.headers)
        return await withAuth[key](event)
    }
    memo[key] = method
    return memo
}, {})

module.exports = {
    ...authMethods,
    signup,
    login,
    forgot,
    reset,
    renew,
    validate
}
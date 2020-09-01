const manageRecord = require('./manage-record')
const signup = require('./auth/signup')
const login = require('./auth/login')
const forgot = require('./auth/forgot')
const reset = require('./auth/reset')
const renew = require('./auth/renew')
const validate = require('./auth/validate')
const billing = require('./pay/billing')
const withAuth = {
    manageRecord
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
    billing,
    signup,
    login,
    forgot,
    reset,
    renew,
    validate
}
const {download} = require('@util')
const { v4: uuidv4 } = require('uuid')

module.exports = async (event) => {
  const {
    headers: {
      email
    }
  } = event
  const flights = await download(email)

  return flights
};
const {download} = require('@util')

module.exports = async (event) => {
  const {
    headers: {
      email
    }
  } = event
  return await download(email)
};
const {download} = require('@util')

module.exports = async (event) => {
  const {
    key
  } = event
  return await download(key)
};
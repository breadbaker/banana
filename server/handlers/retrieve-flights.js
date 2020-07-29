const download = require('@util/download')

module.exports = async (event) => {
  const {
    key
  } = event
  return await download(key)
};
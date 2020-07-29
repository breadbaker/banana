const download = require('@util/download')

exports.handler = async (event) => {
  const {
    key
  } = event
  return await download(key)
};
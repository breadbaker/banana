const download = require('./s3/download')

module.exports = async key => {
  return await download(key)
}
const upload = require('@util/upload')
const download = require('@util/download')

exports.handler = async (event) => {
  const {
    key,
    data
  } = event
  const userRecords = await download(key)

  userRecords.push(data)

  return upload(JSON.stringify(userRecords), key)
};
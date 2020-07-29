const upload = require('@util/upload')
const download = require('@util/download')

module.exports = async (event) => {
  console.log('event')
  console.log(event)
  const {
    key,
    data
  } = event
  const userRecords = await download(key)

  userRecords.push(data)

  return upload(JSON.stringify(userRecords), key)
};
const {download, upload} = require('@util')
const exportRecords = require('./export')
const { v4: uuidv4 } = require('uuid')
module.exports = async (event) => {
  console.log('event')
  console.log(event)
  const {
    headers: {
      email
    },
    data
  } = event
  const userRecords = await download(email)
  data.id = uuidv4()
  userRecords.push(data)

  await upload(JSON.stringify(userRecords), email)
  event.recordsCount = userRecords.length
  await exportRecords(event)
  return
};
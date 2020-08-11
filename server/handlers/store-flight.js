const {download, upload} = require('@util')
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

  return upload(JSON.stringify(userRecords), email)
};
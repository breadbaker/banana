const {download, upload} = require('@util')

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

  userRecords.push(data)

  return upload(JSON.stringify(userRecords), email)
};
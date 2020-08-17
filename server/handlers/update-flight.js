const {download, upload} = require('@util')
module.exports = async (event) => {
  const {
    headers: {
      email
    },
    data
  } = event
  const userRecords = await download(email)

  const flights = userRecords.reduce((memo, item) => {
    if (item.id === data.id) {
      memo.push({
        ...item,
        ...data
      })
    } else {
      memo.push(item)
    }
    return memo
  }, [])

  await upload(JSON.stringify(flights), email)
  // event.recordsCount = userRecords.length
  // await exportRecords(event)
  return
};
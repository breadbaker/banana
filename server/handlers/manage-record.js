const {download} = require('@util')
const { v4: uuidv4 } = require('uuid');
const upload = require('../util/upload');

module.exports = async (event) => {
  const {
    headers: {
      email
    },
    data
  } = event

  const key = `${email}-${data.recordType}`

  const records = await download(key)

  const actions = {
    retrieve: async () => { return records },
    update: async () => {
      await upload(
        records.reduce((memo, item) => {
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
      , key)
    },
    store: async () => {
      data.id = uuidv4()
      records.push(data)
      await upload(records, key)
    }
  }

  await actions[data.action]()

  console.log(records)

  return records
};
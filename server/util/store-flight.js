const fs = require('fs');
const path = require('path')


const upload = require('./s3/upload')
const download = require('./s3/download')


module.exports = async (data, key) => {
  const userRecords = await download(key)

  userRecords.push(data)

  return upload(JSON.stringify(userRecords), key)
  // fs.writeFileSync(path.resolve(__dirname,'..', 'tmp', './userdata.txt'), `${JSON.stringify(data)}\n`, {'flag': 'a'})

}
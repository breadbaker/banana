var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
s3 = new AWS.S3();
const genericParams = {Bucket: 'flightlogboxuserrecords'}

module.exports = async (Key) => {
  const downloadParams = {...genericParams, Key }
  try {
    const r = await s3.getObject(downloadParams).promise()
    const body = r.Body.toString()
    return JSON.parse(body)
  } catch (err) {
    return []
  }
}
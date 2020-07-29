var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
const genericParams = {Bucket: 'flightlogboxuserrecords'}

module.exports = async key => {
  const downloadParams = {...genericParams, Key: key}
  try {
    const r = await s3.getObject(downloadParams).promise()
    const body = r.Body.toString()
    const records = JSON.parse(body)
    return JSON.parse(records)
  } catch (err) {
    return []
  }
}
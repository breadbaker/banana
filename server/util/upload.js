var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
const genericParams = {Bucket: 'flightlogboxuserrecords'}

module.exports = async (body, key) => {
  var uploadParams = {...genericParams, Body: JSON.stringify(body), Key: key};

  try {
    await s3.upload (uploadParams).promise()
  } catch (err) {
    console.log('err', err)
  }
}
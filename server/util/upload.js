var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
s3 = new AWS.S3();
const genericParams = {Bucket: 'flightlogboxuserrecords'}

module.exports = async (content, Key) => {
  console.log('key', Key)
  var uploadParams = {...genericParams, Body: JSON.stringify(content), Key };

  try {
    await s3.upload (uploadParams).promise()
  } catch (err) {
    console.log('err', err)
  }
}
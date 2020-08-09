var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3();

const fs = require('fs')

// call S3 to retrieve upload file to specified bucket
const genericParams = {Bucket: 'flightlogboxuserrecords', ACL: 'public-read'}

module.exports = async ({ filePath, email }) => {
  file = fs.readFileSync(filePath)
  var uploadParams = {...genericParams, Body: file, Key: `${email}export.png`};

  try {
    await s3.upload (uploadParams).promise()
  } catch (err) {
    console.log('err', err)
  }

  await fs.unlinkSync(filePath)
}
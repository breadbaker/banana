const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION_NAME });
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
const genericParams = {
  UserPoolId: process.env.COGNITO_POOL_ID
}

const renew = function({
  RefreshToken,
}) {
  const params = {
    ...genericParams,
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    AuthParameters: {
      "REFRESH_TOKEN": RefreshToken
    }
  }
  return new Promise((resolve, reject) => {
    client.adminInitiateAuth(params, function(err, data) {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(data)
    })
  })
}

module.exports = async event => {
  const renewResult = await renew(event)
  return renewResult
};
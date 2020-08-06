const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
const genericParams = {
  UserPoolId: process.env.COGNITO_POOL_ID
}

const login = function({
  email,
  password
}) {
  const params = {
    ...genericParams,
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    AuthParameters: {
      "USERNAME": email,
      "PASSWORD": password
    }
  }
  return new Promise((resolve, reject) => {
    client.adminInitiateAuth(params, function(err, data) {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      console.log(data)
      resolve(data)
    })
  })
}

module.exports = async event => {
  const loginResult = await login(event)
  return loginResult
};

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
const uuid = require('uuid')
const login = require('./login')
const genericParams = {
  UserPoolId: process.env.COGNITO_POOL_ID,
}

const createUser = function({
  email,
  firstName,
  lastName,
  tempPassword
}) {
  const params = {
    ...genericParams,
    Username: email,
    TemporaryPassword: tempPassword,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'given_name',
        Value: firstName
      },
      {
        Name: 'family_name',
        Value: lastName
      },
      {
        Name: 'email_verified',
        Value: 'true'
      }
    ],
    DesiredDeliveryMediums: [
      'EMAIL'
    ],
    ForceAliasCreation: false,
    MessageAction: 'SUPPRESS'
  }
  return new Promise((resolve, reject) => {
    client.adminCreateUser(params, function(err, data) {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(data.User)
    })
  })
}

const initiateAuth = function({
  email,
  tempPassword
}) {
  const params = {
    ...genericParams,
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    AuthParameters: {
      "USERNAME": email,
      "PASSWORD": tempPassword
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

const respondAuthChallenge = function({
  email,
  password,
  session
}) {
  const params = {
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    Session: session,
    ChallengeResponses: {
        'USERNAME': email,
        'NEW_PASSWORD': password
    }
  }
  return new Promise((resolve, reject) => {
    client.respondToAuthChallenge(params, function(err, data) {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(data.User)
    })
  })
}

module.exports = async event => {
  const tempPassword = `${uuid.v4()}?9P`

  const user = await createUser({
    ...event,
    tempPassword
  })

  const authResult = await initiateAuth({
    ...event,
    tempPassword
  })

  await respondAuthChallenge({
    ...event,
    session: authResult['Session']
  })

  return await login(event)
}
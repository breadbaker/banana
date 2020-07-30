
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
const uuid = require('uuid')
const genericParams = {
  UserPoolId: process.env.COGNITO_POOL_ID
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
    AuthFlow: "ADMIN_NO_SRP_AUTH",
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
  password
}) {
  const params = {
    ...genericParams,
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    Session: result['Session'],
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
  const {
    firstName,
    lastName,
    email,
    password
  } = event

  const tempPassword = `${uuid.v4()}?9`

  const user = await createUser({
    ...event,
    tempPassword
  })

  const authResult = await initiateAuth({
    ...event,
    tempPassword
  })

  const respondAuthChallengeResult = await respondAuthChallenge({
    ...event,
    session: authResult['Session']
  })

  return respondAuthChallengeResult
}
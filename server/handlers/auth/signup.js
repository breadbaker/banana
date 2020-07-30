const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: process.env.COGNITO_POOL_ID,
   ClientId: process.env.COGNITO_POOL_CLIENT_ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
module.exports = async event => {
  const {
    firstName,
    lastName,
    email,
    password
  } = event

  var attributeList = [];
   
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name", Value: firstName }));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "family_name", Value: lastName }));
  await userPool.signUp(email, password, attributeList, null)

}
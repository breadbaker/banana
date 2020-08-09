const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION_NAME });
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
const client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const renew = require('./renew')
const genericParams = {
  UserPoolId: process.env.COGNITO_POOL_ID
}

const validate = async function({
  AccessToken,
  RefreshToken
}) {

  const response = await axios.get(`https://cognito-idp.${process.env.AWS_REGION_NAME}.amazonaws.com/${process.env.COGNITO_POOL_ID}/.well-known/jwks.json`)


  const pems = {};
  var keys = response.data['keys'];
  for(var i = 0; i < keys.length; i++) {
    var key_id = keys[i].kid;
    var modulus = keys[i].n;
    var exponent = keys[i].e;
    var key_type = keys[i].kty;
    var jwk = { kty: key_type, n: modulus, e: exponent};
    var pem = jwkToPem(jwk);
    pems[key_id] = pem;
  }
  var decodedJwt = jwt.decode(AccessToken, {complete: true});
  const {
    payload: {
      exp
    }
  } = decodedJwt
  if (new Date(exp * 1000) < new Date()) {
  }
  if (!decodedJwt) {
      console.log("Not a valid JWT token");
      // callback(new Error('Not a valid JWT token'));
  }
  var kid = decodedJwt.header.kid;
  var pem = pems[kid];
  if (!pem) {
      console.log('Invalid token');
      // callback(new Error('Invalid token'));
  }
  jwt.verify(AccessToken, pem, function(err, payload) {
      if(err) {
        console.log(err)
          if (err)

          console.log("Invalid Token.");
          // callback(new Error('Invalid token'));
      } else {

          console.log("Valid Token.");
          // callback(null, "Valid token");
      }
  });

  // console.log(response.data)
//   return new Promise((resolve, reject) => {
//     client.adminInitiateAuth(params, function(err, data) {
//       if (err) {
//         console.log(err.message);
//         reject(err);
//         return;
//       }
//       console.log(data)
//       resolve(data)
//     })
//   })
}

module.exports = async event => {
  const loginResult = await validate(event)
  return loginResult
};

// exports.Validate = function(token, callback){
//   request({
//       url : `https://cognito
// idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
//       json : true
//    }, function(error, response, body){
//       if (!error && response.statusCode === 200) {
//           pems = {};
//           var keys = body['keys'];
//           for(var i = 0; i < keys.length; i++) {
//                var key_id = keys[i].kid;
//                var modulus = keys[i].n;
//                var exponent = keys[i].e;
//                var key_type = keys[i].kty;
//                var jwk = { kty: key_type, n: modulus, e: exponent};
//                var pem = jwkToPem(jwk);
//                pems[key_id] = pem;
//           }
//        var decodedJwt = jwt.decode(token, {complete: true});
//                if (!decodedJwt) {
//                    console.log("Not a valid JWT token");
//                    callback(new Error('Not a valid JWT token'));
//                }
//                var kid = decodedJwt.header.kid;
//                var pem = pems[kid];
//                if (!pem) {
//                    console.log('Invalid token');
//                    callback(new Error('Invalid token'));
//                }
//               jwt.verify(token, pem, function(err, payload) {
//                    if(err) {
//                        console.log("Invalid Token.");
//                        callback(new Error('Invalid token'));
//                    } else {
//                         console.log("Valid Token.");
//                         callback(null, "Valid token");
//                    }
//               });
//       } else {
//             console.log("Error! Unable to download JWKs");
//             callback(error);
//       }
//   });
// }
const AWS = require("aws-sdk");
const crypto = require("crypto");

const REGION = "us-east-1";
const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";
const USER_POOL_ID = "your-user-pool-id";

AWS.config.update({ region: REGION });

const cognito = new AWS.CognitoIdentityServiceProvider();

function generateSecretHash(email) {
  return crypto
    .createHmac("SHA256", CLIENT_SECRET)
    .update(email + CLIENT_ID)
    .digest("base64");
}

module.exports = {
  cognito,
  CLIENT_ID,
  USER_POOL_ID,
  generateSecretHash
};

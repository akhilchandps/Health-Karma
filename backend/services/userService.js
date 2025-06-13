const { cognito, CLIENT_ID, generateSecretHash } = require("../config/cognito");

exports.registerUser = async ({ email, password }) => {
  const params = {
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    SecretHash: generateSecretHash(email),
    UserAttributes: [
      {
        Name: "email",
        Value: email
      }
    ]
  };

  try {
    const data = await cognito.signUp(params).promise();
    return { userSub: data.UserSub, message: "OTP sent to email for verification" };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.confirmUser = async ({ email, confirmationCode }) => {
  const params = {
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmationCode,
    SecretHash: generateSecretHash(email)
  };

  try {
    await cognito.confirmSignUp(params).promise();
    return { message: "Email verified successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.loginUser = async ({ email, password }) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: generateSecretHash(email)
    }
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    return {
      token: data.AuthenticationResult.IdToken
    };
  } catch (err) {
    throw new Error("Invalid credentials or unconfirmed email");
  }
};

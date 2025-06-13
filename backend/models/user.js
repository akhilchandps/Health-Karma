// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    cognitoSub: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Unique Cognito UUID (sub) for each user
    },
  });

  return User;
};

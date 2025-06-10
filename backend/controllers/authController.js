// controllers/userController.js
const userService = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token } = await userService.loginUser(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

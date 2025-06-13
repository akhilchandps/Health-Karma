const userService = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirm = async (req, res) => {
  try {
    const result = await userService.confirmUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.json({ message: "Login successful", token: result.token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

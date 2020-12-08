const User = require("../models/User");
const createToken = require("../libs/helper");
class ControllerAuth {
  async registerGetController(req, res) {
    const users = await User.find().select({ password: 0 });
    res.json(users);
  }
  async registerController(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      return res
        .status(201)
        .header("auth-token", token)
        .json("Registrado Admin!");
    } catch (error) {
      switch (error.code) {
        case 11000:
          return res.status(500).json("Este usuario esta registado");
        default:
          res.status(500).json(error);
          return;
      }
    }
  }
  async loginController(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      return res
        .status(200)
        .header("auth-token", token)
        .json(`Bienvenido ${user.email}`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = ControllerAuth;

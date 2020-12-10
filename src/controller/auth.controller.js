const Admin = require("../models/Admin");
const createToken = require("../libs/helper");
class ControllerAuth {
  async registerGetController(req, res) {
    const admins = await Admin.find().select({ password: 0, _id: 0, __v: 0 });
    res.json(admins);
  }
  async registerController(req, res) {
    const { email, password } = req.body;
    try {
      const admin = await Admin.create({ email, password });
      const token = createToken(admin.email);
      return res
        .status(201)
        .header("auth-token", token)
        .json("Registrado Admin!");
    } catch (error) {
      switch (error.code) {
        case 11000:
          return res.status(500).json("Este Admin esta registado");
        default:
          res.status(500).json(error);
          return;
      }
    }
  }
  async loginController(req, res) {
    const { email, password } = req.body;
    try {
      const admin = await Admin.login(email, password);
      const token = createToken(admin.email);
      return res
        .status(200)
        .header("auth-token", token)
        .json(`Bienvenido ${admin.email}`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = ControllerAuth;

const Admin = require("../models/Admin");
const createToken = require("../libs/helper");
const { handleError } = require("../libs/handleError");
class ControllerAuth {
  async registerGetController(req, res) {
    try {
      const admins = await Admin.find().select({ password: 0, _id: 0, __v: 0 });
      if (admins.length === 0) {
        return res.status(200).json("Admin no registrado");
      }
	res.status(200).json({msg:"Administradores",admins})
    } catch (error) {
      return res.status(500).json(error);
    }
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
      handleError(error, res, "Admin");
    }
  }
  async loginController(req, res) {
    const { email, password } = req.body;
    try {
      if (email.trim() === "" || password.trim() === "") {
        return res
          .status(400)
          .json("Todos los datos son necesarios para el login");
      }
      const admin = await Admin.login(email, password, res);
      const token = createToken(admin.email);
      return res
        .status(200)
        .header("auth-token", token)
        .json(`Bienvenido ${admin.email}`);
    } catch (error) {}
  }
}

module.exports = ControllerAuth;

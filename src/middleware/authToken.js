const jwt = require("jsonwebtoken");
module.exports = class AuthToken {
  static adminAccess(req, res, next) {
    try {
      const tokenHeader = req.headers["auth-token"];
      if (!tokenHeader) {
        return res.status(401).json("No existe token");
      }
      const tokenDedoce = jwt.verify(tokenHeader, process.env.SECRET_KEY);
      const { email } = tokenDedoce;
      req.adminEmail = email;
      next();
    } catch ({ message }) {
      if (message === "jwt expired") {
        res.status(403).json("El Token Expiró");
      } else {
        res.status(403).json("Este token es invalido");
      }
    }
  }
};

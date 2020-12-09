const jwt = require("jsonwebtoken");

module.exports = class AuthToken {
  static adminAccess(req, res, next) {
    try {
      const tokenHeader = req.headers["auth-token"];
      console.log(tokenHeader);
      if (!tokenHeader) {
        return res.status(401).json("No existe token");
      }
      const tokenDedoce = jwt.verify(tokenHeader, process.env.SECRET_KEY);
      if (!tokenDedoce) {
        res.status(403).json("Token es invalido");
        return next();
      }
      const { id } = tokenDedoce;
      req.adminId = id;
      next();
    } catch ({ message }) {
      if (message === "jwt expired") {
        res.status(403).json("El Token Expiró");
      }
    }
  }
};

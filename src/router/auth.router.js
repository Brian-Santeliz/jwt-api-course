const { Router } = require("express");
const ControllerAuth = require("../controller/auth.controller");
const controller = new ControllerAuth();
const router = Router();
//crear la ruta ger aparte
router.post("/register", controller.registerController);
router.get("/register", controller.registerGetController);
router.post("/login", controller.loginController);
module.exports = router;

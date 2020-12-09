const { Router } = require("express");
const ControllerAuth = require("../controller/auth.controller");
const controller = new ControllerAuth();
const router = Router();
router.get("/admin", controller.registerGetController);
router.post("/register", controller.registerController);
router.post("/login", controller.loginController);
module.exports = router;

const { Router } = require("express");
const router = Router();
const ControllerProfesor = require("../controller/profesor.controller");
const controller = new ControllerProfesor();
router.get("/", controller.getProfesor);
router.get("/:id", controller.getProfesorId);
router.post("/", controller.postProfesor);
router.delete("/:id", controller.deleteProfesor);
router.put("/:id", controller.putProfesor);
module.exports = router;

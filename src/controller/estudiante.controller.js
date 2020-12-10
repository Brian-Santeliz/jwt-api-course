const Estudiante = require("../models/Estudiante");
const { handleError } = require("../libs/handleError");
module.exports = class ControllerEstudiante {
  getEstudiante(req, res) {
    Estudiante.find()
      .then((estudiantes) => {
        if (estudiantes.length !== 0) {
          return res.status(200).json({ Admin: req.adminEmail, estudiantes });
        }
        return res.status(201).json("Estudiantes no registrados");
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  getEstudianteId(req, res) {
    const { id } = req.params;
    Estudiante.findById({ _id: id })
      .then((estudiante) => {
        if (!estudiante) {
          return res.status(200).json("Este ID de estudiante no existe");
        }
        return res.status(200).json({ msg: "Estudiante por ID", estudiante });
      })
      .catch((e) => {
        if (e.kind === "ObjectId") {
          return res.status(400).json("Estructura de ID No existe");
        }
        res.status(500).json(e);
      });
  }
  deleteEstudiante(req, res) {
    const { id } = req.params;
    Estudiante.findByIdAndDelete({ _id: id })
      .then((estado) => {
        if (!estado) {
          return res.status(400).json("Este ID no corresponde a un estudiante");
        }
        res.status(200).json("Estudiante eliminado");
      })
      .catch((e) => res.status(500).json(e));
  }
  async postEstudiante(req, res) {
    const { nombre, apellido, cedula } = req.body;
    try {
      const estudiante = new Estudiante({
        nombre,
        apellido,
        cedula,
      });
      await estudiante.save();
      res.status(201).json(estudiante);
    } catch (error) {
      handleError(error, res, "Estudiante");
    }
  }
  async putController(req, res) {
    const { id } = req.params;
    const { nombre, apellido, cedula } = req.body;
    try {
      if (
        nombre.trim() === "" ||
        apellido.trim() === "" ||
        cedula.trim() === ""
      ) {
        return res
          .status(400)
          .json("Todos los datos son necesarios para actualizar");
      }
      const estudiante = await Estudiante.findByIdAndUpdate(
        { _id: id },
        { nombre, apellido, cedula },
        { new: true }
      );
      return res.status(201).json({ msg: "Actualizado", estudiante });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

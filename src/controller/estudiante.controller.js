const Estudiante = require("../models/Estudiante");
module.exports = class ControllerEstudiante {
  getEstudiante(req, res) {
    Estudiante.find()
      .then((estudiantes) => {
        if (estudiantes.length !== 0) {
          return res.status(200).json(estudiantes);
        }
        return res.status(201).json("Estudiantes no registrados");
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  getEstudianteId(req, res) {
    const { id } = req.params;
    Estudiante.findById({ _id: id }).then((estudiante) => {
      if (!estudiante) {
        return res.status(200).json("Estudiante no existe con este ID");
      }
      return res.status(200).json({ msg: "Estudiante por ID", estudiante });
    });
  }
  deleteEstudiante(req, res) {
    const { id } = req.params;
    Estudiante.findByIdAndDelete({ _id: id })
      .then(() => {
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
      switch (error.code) {
        case 11000:
          return res.status(500).json(`Este Estudiante esta registado`);
        default:
          res.status(500).json({ msg: "EStudiante agregado", error });
          return;
      }
    }
  }
  async putController(req, res) {
    const { id } = req.params;
    const { nombre, apellido, cedula } = req.body;
    try {
      const estudiante = await Estudiante.findByIdAndUpdate(
        { _id: id },
        { nombre, apellido, cedula },
        { new: true }
      );
      res.status(201).json({ msg: "Actualizado", estudiante });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

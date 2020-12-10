const Profesor = require("../models/Profesor");
module.exports = class ControllerProfesor {
  getProfesor(req, res) {
    Profesor.find()
      .then((profesores) => {
        if (profesores.length !== 0) {
          return res.status(200).json({ Admin: req.adminEmail, profesores });
        }
        return res.status(200).json("Profesores no Agregados");
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  getProfesorId(req, res) {
    const { id } = req.params;
    Profesor.findById(id)
      .then((profesor) => {
        if (!profesor) {
          return res.status(400).json("Este ID de profesor no existe");
        }
        res.status(200).json({ msg: "Profesor por ID", profesor });
      })
      .catch((e) => res.status(500).json(e));
  }
  deleteProfesor(req, res) {
    const { id } = req.params;
    Profesor.findByIdAndDelete({ _id: id })
      .then((estado) => {
        if (!estado) {
          return res.status(400).json("Este ID no corresponde a un profesor");
        }
        res.status(200).json("Profesor Eliminado");
      })
      .catch((e) => res.status(500).json(e));
  }
  async putProfesor(req, res) {
    const { id } = req.params;
    const { nombre, apellido, cedula, estudio } = req.body;
    try {
      if (
        nombre.trim() !== "" &&
        apellido.trim() !== "" &&
        cedula.trim() !== "" &&
        estudio.trim() !== ""
      ) {
        const profesorActualizado = await Profesor.findByIdAndUpdate(
          { _id: id },
          { nombre, apellido, cedula, estudio },
          {
            new: true,
          }
        );
        return res
          .status(201)
          .json({ msg: "Actualizado", profesorActualizado });
      }
      return res
        .status(400)
        .json("Todos los datos son obligatorios para actualizar");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async postProfesor(req, res) {
    const { nombre, apellido, cedula, estudio } = req.body;
    try {
      const profesor = new Profesor({
        nombre,
        apellido,
        cedula,
        estudio,
      });
      await profesor.save();
      res.status(201).json({ msg: "Agregado profesor", profesor });
    } catch (error) {
      switch (error.code) {
        case 11000:
          return res.status(500).json("Este Profesor esta registado");
        default:
          res.status(500).json(error);
          return;
      }
    }
  }
};

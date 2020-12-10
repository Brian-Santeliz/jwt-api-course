const Curso = require("../models/Curso");
const { buscarProfesor, buscarEstudiante } = require("../libs/cursosHelper");
const { response } = require("express");
module.exports = class ControllerCurso {
  getCurso(req, res) {
    Curso.find()
      .populate("profesor")
      .populate("estudiantes")
      .then((cursos) => {
        if (cursos.length === 0) {
          return res.status(200).json("No existen Cursos Registrados");
        }
        return res.status(200).json({ Admin: req.adminEmail, cursos });
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  async postCurso(req, res) {
    const {
      descripcion,
      profesor,
      fechas,
      estudiantes,
      definitivas,
    } = req.body;
    try {
      const idProfesor = await buscarProfesor(profesor);
      const estudiante = await buscarEstudiante(estudiantes);
      const curso = new Curso({
        descripcion,
        fechas,
        profesor: idProfesor,
        estudiantes: estudiante,
        definitivas,
      });
      await curso.save();
      res.status(201).json({ msg: "Curso Creado", curso });
    } catch (error) {
      switch (error.code) {
        case 11000:
          return res.status(500).json("Este Curso se encuentra registado");
        default:
          res.status(500).json(error);
          return;
      }
    }
  }
  async getCursoId(req, res) {
    const { id } = req.params;
    try {
      const curso = await Curso.find({ _id: id })
        .populate("profesor")
        .populate("estudiantes");
      if (!curso || curso.length === 0) {
        return res.status(400).json("Este ID de curso no existe");
      }
      res.status(200).json(curso);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(500).json("Este ID No corresponde a un curso");
      }
      res.status(500).json(error);
    }
  }
  async deleteCurso(req, res) {
    const { id } = req.params;
    try {
      const respuesta = await Curso.findByIdAndDelete({
        _id: id,
      });
      if (!respuesta) {
        return res.status(400).json("Este ID no corresponde a un Curso");
      }
      res.status(200).json("Curso eliminado correctamente");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async putCurso(req, res) {
    const { id } = req.params;
    const {
      descripcion,
      profesor,
      fechas,
      estudiantes,
      definitivas,
    } = req.body;
    try {
      const idProfesor = await buscarProfesor(profesor);
      const estudiante = await buscarEstudiante(estudiantes);
      const cursoActualizado = await Curso.findOneAndUpdate(
        { _id: id },
        {
          descripcion,
          profesor: idProfesor,
          fechas,
          estudiantes: estudiante,
          definitivas,
        },
        { new: true }
      );
      res.status(201).json({ msg: "Curso actualizado", cursoActualizado });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
};

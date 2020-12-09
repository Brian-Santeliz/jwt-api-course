const mongoose = require("mongoose");
const fechaSchema = mongoose.Schema({
  fechaInicio: {
    type: String,
    required: [true, "Fecha de inicio es requerido"],
    trim: true,
  },
  fechaFin: {
    type: String,
    required: [true, "Fecha final es requerido"],
    trim: true,
  },
});
const definitivasSchema = mongoose.Schema({
  calificacion: {
    type: Number,
    required: [true, "Las calificaciones son requeridas"],
  },
  nombre: {
    type: String,
    required: [true, "El nombre del estudiante es requerido"],
    lowercase: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, "El apellido del estudiante es requerido"],
    lowercase: true,
    trim: true,
  },
});
module.exports = {
  definitivasSchema,
  fechaSchema,
};

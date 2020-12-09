const mongoose = require("mongoose");
const { definitivasSchema, fechaSchema } = require("../libs/schemaCursos");

const cursoSchema = mongoose.Schema(
  {
    descripcion: {
      required: true,
      type: String,
      trim: true,
      required: [true, "Descripcion es requerida"],
      unique: true,
    },
    profesor: {
      required: true,
      ref: "Profesor",
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, "El Profesor es requerido"],
      lowercase: true,
    },
    fechas: [fechaSchema],
    estudiantes: [
      {
        required: [true, "Los id de estudiantes son requeridos"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estudiante",
        trim: true,
      },
    ],
    definitivas: [definitivasSchema],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Curso", cursoSchema);

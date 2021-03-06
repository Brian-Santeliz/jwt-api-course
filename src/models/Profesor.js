const mongoose = require("mongoose");

const profesorSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: [true, "Ingrese un nombre"],
      lowercase: true,
    },
    apellido: {
      type: String,
      trim: true,
      required: [true, "Ingrese el apellido"],
      lowercase: true,
    },
    cedula: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, "Ingrese la cédula"],
    },
    estudio: {
      type: String,
      trim: true,
      required: [true, "Ingrese el grado de estudio"],
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Profesor", profesorSchema);

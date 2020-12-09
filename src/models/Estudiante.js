const mongoose = require("mongoose");

const estudianteSchema = mongoose.Schema(
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
      required: [true, "Ingrese la cédula"],
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Estudiante", estudianteSchema);

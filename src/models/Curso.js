const mongoose = require("mongoose");

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
    fechas: [
      {
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
      },
    ],
    estudiantes: [
      {
        required: [true, "Los id de estudiantes son requeridos"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estudiante",
        trim: true,
      },
    ],
    definitivas: [
      {
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
      },
    ],
  },
  {
    versionKey: false,
  }
);

/* 
SI NO FUNCIONA ASI CREAR ENTONCES
1-) estudiantes:[{
  nombre:{
    type:string
  },
  cedula:{
    type:Strin
  }
}]
2-) estudiateSchema :{
  nombre:string,
  cedula:string,
  apellido:string
}
estudiante:[estudianteSchema]


*/
module.exports = mongoose.model("Curso", cursoSchema);

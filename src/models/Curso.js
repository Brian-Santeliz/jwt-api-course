const mongoose = require("mongoose");

const cursoSchema = mongoose.Schema(
  {
    descripcion: {
      required: true,
      type: String,
      trim: true,
      required: [true, "Descripcion es requerida"],
    },
    profesor: {
      required: true,
      ref: "Profesor",
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, "El Profesor es requerido"],
      lowercase: true,
    },
    fecha: {
      required: [true, "Fecha es requerido"],
      type: String,
      trim: true,
      default: new Date(),
    },
    estudiantes: [
      {
        required: [true, "Los id de estudiantes son requeridos"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estudiante",
        trim: true,
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

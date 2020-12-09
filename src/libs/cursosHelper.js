const Profesor = require("../models/Profesor");
const Estudiante = require("../models/Estudiante");
exports.buscarProfesor = async (profesor) => {
  try {
    const profesorResponse = await Profesor.find({
      cedula: profesor,
    });
    return profesorResponse[0]._id;
  } catch (error) {
    console.log(error);
  }
};

exports.buscarEstudiante = async (estudiantes) => {
  try {
    const response = await Estudiante.find({ cedula: estudiantes });
    return response.map((estudiante) => estudiante._id);
  } catch (error) {
    console.log(error);
  }
};

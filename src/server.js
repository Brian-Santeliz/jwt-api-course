const express = require("express");
const morgan = require("morgan");
const app = express();
const AuthToken = require("./middleware/authToken");
const authRouter = require("./router/auth.router");
const profesorRouter = require("./router/profesor.router");
const estudianteRouter = require("./router/estudiante.router");
const cursoRouter = require("./router/curso.router");
app.set("port", process.env.PORT || 2020);
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/api/profesores", AuthToken.adminAccess, profesorRouter);
app.use("/api/estudiantes", AuthToken.adminAccess, estudianteRouter);
app.use("/api/cursos", AuthToken.adminAccess, cursoRouter);
module.exports = app;

const express = require("express");
const morgan = require("morgan");
const app = express();
const Connect = require("./config/connect");
const authRouter = require("./router/auth.router");
app.set("port", process.env.PORT || 2020);
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRouter);

app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
  Connect.startConnection();
});

const { connect, set } = require("mongoose");
require("dotenv").config({ path: "secret.env" });
const optionsMongo = require("./options");
class Connect {
  static async startConnection() {
    try {
      set("useCreateIndex", true);
      await connect(process.env.URI, optionsMongo);
      console.log("Base de datos conectada");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Connect;

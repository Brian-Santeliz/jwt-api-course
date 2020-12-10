module.exports = class handleError {
  constructor(res, error, contexto) {
    this.res = res;
    this.error = error;
    this.contexto = contexto;
  }
  handleErrorMessage() {
    switch (this.error.code) {
      case 11000:
        return this.res
          .status(500)
          .json(`Este ${this.contexto} esta registado`);
      default:
        this.res.status(500).json(error);
        return;
    }
  }
};
exports.handleError = (error, res, contexto) => {
  switch (error.code) {
    case 11000:
      return res.status(500).json(`Este ${contexto} esta registado`);
    default:
      res.status(500).json(error);
      return;
  }
};

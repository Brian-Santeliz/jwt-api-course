exports.handleError = (error, res, contexto) => {
  switch (error.code) {
    case 11000:
      return res.status(500).json(`Este ${contexto} esta registado`);
    default:
      res.status(500).json(error);
      return;
  }
};

exports.handleErrorId = (e, res) => {
  if (e.kind === "ObjectId") {
    return res.status(400).json("Estructura de ID No existe");
  } else {
    res.status(500).json(e);
  }
};

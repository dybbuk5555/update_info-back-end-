const Principle = require("../models/principle.model.js");

// Retrieve all data from the database (with condition).
exports.findAll = (req, res) => {
  let cnae_principal = null;
  let situacao_registro = null;
  let situacao_anuidade = null;

  if(req.query.cnae_principal) {
    cnae_principal = JSON.parse(req.query.cnae_principal);
  }
  if(req.query.situacao_registro) {
    situacao_registro = JSON.parse(req.query.situacao_registro);
  }
  if(req.query.situacao_anuidade) {
    situacao_anuidade = JSON.parse(req.query.situacao_anuidade);
  }
  const start = Number.parseInt(req.query._start);
  const limit = Number.parseInt(req.query._limit);
  console.log(cnae_principal);

  Principle.findAll({ cnae_principal, situacao_registro, situacao_anuidade, start, limit }, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving filter result."
      });
    else res.send(data);
  });
};

// Update a row identified by the cnpj in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const cnpj = req.body.cnpj;
  const razao_social = req.body.razao_social;
  const endereco = req.body.endereco;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const cep = req.body.cep;
  const situacao_registro = req.body.situacao_registro;
  const situacao_anuidade = req.body.situacao_anuidade;
  const registro_regional = req.body.registro_regional;

  Principle.update(
    { cnpj, razao_social, endereco, cidade, uf, cep, situacao_registro, situacao_anuidade, registro_regional },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Principle with CNPJ ${cnpj}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Principle with CNPJ " + cnpj
          });
        }
      } else res.send(data);
    }
  );
};

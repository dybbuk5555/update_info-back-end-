const sql = require("./db.js");

// constructor
const Principle = function (principle) {
  this.cnpj = principle.cnpj;
  this.razao_social = principle.razao_social;
  this.nome_fantasia = principle.fantasia;
  this.endereco = principle.endereco;
  this.cidade = principle.cidade;
  this.uf = principle.uf;
  this.cep = principle.cep;
  this.cnae_principal = principle.cnae_principal;
  this.cnae_secundario = principle.secundario;
  this.situacao_registro = principle.situacao_registro;
  this.situacao_anuidade = principle.situacao_anuidade;
  this.registro_regional = principle.registro_regional;
};

Principle.findAll = ({ cnae_principal, situacao_registro, situacao_anuidade }, result) => {
  let query = "SELECT * FROM tabela_dados_local_principal";

  if (cnae_principal) {
    query += ` WHERE CNAE_principal LIKE '${cnae_principal}%'`;
  }

  if (situacao_registro) {
    query += ` and Situacao_registro LIKE '${situacao_registro}'`;
  }

  if (situacao_anuidade) {
    query += ` and Situacao_anuidade LIKE '${situacao_anuidade}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

Principle.update = ({ cnpj, razao_social, endereco, cidade, uf, cep, situacao_registro, situacao_anuidade, registro_regional }, result) => {
  cnpj = cnpj.slice(0, 2) + "." + cnpj.slice(2, 5) + "." + cnpj.slice(5, 8) + "/" + cnpj.slice(8, 12) + "-" + cnpj.slice(12);

  sql.query(
    "UPDATE tabela_dados_local_principal SET Razao_Social = ?, Endereco = ?, Cidade = ?, UF = ?, CEP = ?, Situacao_registro = ?, Situacao_anuidade = ?, Registro_Regional = ? WHERE CNPJ = ?",
    [razao_social, endereco, cidade, uf, cep, situacao_registro, situacao_anuidade, registro_regional, cnpj],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found data with the cnpj
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated data: ", { cnpj: cnpj });
      result(null, { cnpj: cnpj });
    }
  );
};

module.exports = Principle;
const sql = require("./db.js");

exports.findAll = ({ cnae_principal, situacao_registro, situacao_anuidade, start, limit }, result) => {
  let query = "SELECT * FROM tabela_dados_local_principal";

  if (cnae_principal) {
    query += ` WHERE CNAE_principal LIKE '${cnae_principal}'`;
  }

  if (situacao_registro) {
    query += ` and (Situacao_registro LIKE '${situacao_registro[0]}'`;
    
    for (let i = 1; i < situacao_registro.length; i ++) 
      query += ` or Situacao_registro LIKE '${situacao_registro[i]}'`;
    
    query += `)`;
    
  }

  if (situacao_anuidade) {
    query += ` and Situacao_anuidade LIKE '${situacao_anuidade}'`;
  }

  query += ` Limit ${start}, ${limit}`;

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

exports.update = ({ cnpj, razao_social, endereco, cidade, uf, cep, situacao_registro, situacao_anuidade, registro_regional }, result) => {
  cnpj = cnpj.slice(0, 2) + "." + cnpj.slice(2, 5) + "." + cnpj.slice(5, 8) + "/" + cnpj.slice(8, 12) + "-" + cnpj.slice(12);
  const query = `UPDATE tabela_dados_local_principal SET Razao_Social = '${razao_social}', Endereco = '${endereco}', Cidade = '${cidade}', UF = '${uf}', CEP = '${cep}', Situacao_registro = '${situacao_registro}', Situacao_anuidade = '${situacao_anuidade}', Registro_Regional = '${registro_regional}' WHERE CNPJ = '${cnpj}'`;
  sql.query(
    query, 
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

      result(null, { cnpj: cnpj });
    }
  );
};



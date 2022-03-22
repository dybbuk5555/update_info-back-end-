const sql = require("./db.js");

exports.getAll = (result) => {
  let query = "SELECT CNAE FROM tabela_lista_filtros_cnae";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};


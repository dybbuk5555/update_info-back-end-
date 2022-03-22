const sql = require("./db.js");

exports.getAll = (result) => {
    let query = "SELECT Situacao_registro FROM tabela_lista_filtros_situacao_registro";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};


const sql = require("./db.js");

// constructor
const Register = function (register) {
    this.situacao_registro = register.situacao_registro;
};

Register.getAll = (result) => {
    let query = "SELECT Situacao_Registro FROM Tabela_lista_filtros_Situação_Registro";

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

module.exports = Register;

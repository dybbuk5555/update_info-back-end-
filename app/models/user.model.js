const sql = require("./db.js");

exports.findOne = ({ username, password }, result) => {
    sql.query(`SELECT * FROM tabela_users_sgdb WHERE user LIKE '${username}' and senha LIKE '${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};


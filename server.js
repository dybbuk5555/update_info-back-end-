const express = require("express");
const cors = require("cors");
const request = require("request");
const schedule = require('node-schedule');
const sql = require("./app/models/db.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

var options = {
  'method': 'GET',
  'url': 'https://crea-to.sitac.com.br/app/webservices/movel_fiscalizacao/getEmpresa',
  'headers': {
    'Authorization': 'Basic bW92ZWw6YWJlYjBmZWU1ZDIyYjQxZWE1ZWUzYTRhMTI2MDRjYzI2N2IzZDMxMw==',
    'Cookie': 'PHPSESSID=jkv5t1h3lajiq8k39cmk0ih8r7'
  }
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/routes.js")(app);
require("./app/routes/auth.routes.js")(app);


const job = schedule.scheduleJob('*/1 * * * *', function () {
/*  request(options, function (error, response) {
    if (error) throw new Error(error);

    const data = JSON.parse(response.body);
    
    let cnpj, razao_social, endereco, cidade, uf, cep, situacao_registro, situacao_anuidade, registro_regional;

    for (let i = 0; i < data.length; i++) {
      cnpj = data[i].cnpj;
      razao_social = data[i].razao_social;
      endereco = data[i].endereco.logradouro;
      cidade = data[i].endereco.cidade;
      uf = data[i].endereco.uf;
      cep = data[i].endereco.cep;
      situacao_registro = data[i].situacaoRegistroAtual;
      situacao_anuidade = data[i].situacaoAnuidade;
      registro_regional = data[i].registroRegional;
      cnpj = cnpj.slice(0, 2) + "." + cnpj.slice(2, 5) + "." + cnpj.slice(5, 8) + "/" + cnpj.slice(8, 12) + "-" + cnpj.slice(12);
      console.log(cnpj);
      sql.query(
        "UPDATE tabela_dados_local_principal SET Razao_Social = ?, Endereco = ?, Cidade = ?, UF = ?, CEP = ?, Situacao_registro = ?, Situacao_anuidade = ?, Registro_Regional = ? WHERE CNPJ = ?",
        [razao_social, endereco, cidade, uf, cep, situacao_registro, situacao_anuidade, registro_regional, cnpj],
        (err, res) => {
          if (err) throw err;
          console.log(res);
        }
      );
    }
  });*/
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

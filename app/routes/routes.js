const principle = require("../controllers/principle.controller.js");
const cnae = require("../controllers/cnae.controller.js");
const register = require("../controllers/register.controller.js");
const authJwt = require("../middleware/authjwt.js");

var router = require("express").Router();

module.exports = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all principle table rows(with condition or without condition)
  router.get("/principle", [authJwt], principle.findAll);

  // Update a principle table rows
  router.post("/principle", [authJwt], principle.update);

  // Retrieve all cnae table rows
  router.get("/cnae", [authJwt], cnae.getAll);

  // Retrieve all register table rows
  router.get("/register", [authJwt], register.getAll);

  app.use('/api', router);
};

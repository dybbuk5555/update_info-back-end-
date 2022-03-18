module.exports = app => {
  const principle = require("../controllers/principle.controller.js");
  const cnae = require("../controllers/cnae.controller.js");
  const register = require("../controllers/register.controller.js");

  var router = require("express").Router();

  // Retrieve all principle table rows(with condition or without condition)
  router.get("/principle", principle.findAll);

  // Update a principle table rows
  router.post("/principle", principle.update);

  // Retrieve all cnae table rows
  router.get("/cnae", cnae.getAll);

  // Retrieve all register table rows
  router.get("/register", register.getAll);

  app.use('/api', router);
};

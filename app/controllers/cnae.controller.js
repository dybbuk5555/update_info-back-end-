const Cnae = require("../models/cnae.model.js");

// Retrieve all CNAE items from the database.
exports.getAll = (req, res) => {
  Cnae.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving whole CNAE items."
      });
    else res.send(data);
  });
};


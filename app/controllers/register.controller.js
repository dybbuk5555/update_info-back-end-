const Register = require("../models/register.model.js");

// Retrieve all Register items from the database.
exports.getAll = (req, res) => {
  Register.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving whole Register items."
      });
    else res.send(data);
  });
};


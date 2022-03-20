const User = require("../models/user.model.js");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username, password }, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else {
            var token = jwt.sign({ username: username }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                username: username,
                accessToken: token
            });

        };
    });

};
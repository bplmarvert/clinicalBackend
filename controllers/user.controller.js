const db = require("../models");
const User = db.user;
let uuid = require("uuid");

const auth = require("../authentication/authentication");

// Find the password of a user with the name
exports.findOne = (req, res) => {
  console.log("req.body", req.body);
  const username = req.body.username;
  const password = req.body.password;
  let token = auth.generateToken();
  const theuser = new User({
    userName: username,
    password: password,
    token: token.token,
  });
  console.log("theuser ", theuser);

  User.findOne({ userName: username, password: password })
    .then((data) => {
      if (!data)
        res
          .status(403)
          .send({ message: "User " + username + " doesn't exist" });
      else {
        console.log("data = ", data);
        console.log("user ", theuser);
        theuser.save({ userName: username });
        res.send(token); // renvoi ici
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving user : " + username + " " + err });
    });
};

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  console.log("req.body in user.controller exports.create", req.body);
  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // The data is valid we fill it in the structure that will be saved
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
  });

  // Save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "an error occurred while creating the user.",
      });
    });
};

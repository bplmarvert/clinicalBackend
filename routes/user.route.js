module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // **************** Users **************** //
  // Create a new user
  router.post("/create", user.create);

  // Retrieve Password
  router.post("/", user.findOne);

  app.use("/api/user", router);
};

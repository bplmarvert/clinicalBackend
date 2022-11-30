module.exports = (app) => {
  const study = require("../controllers/study.controller.js");

  var router = require("express").Router();

  // Create a new study
  router.post("/create", study.create);

  // Retrieve all studies
  router.get("/findAll", study.findAll);

  // Retrieve a single study with id
  router.get("/:id", study.findOne);

  // Update a study with id
  router.put("/:id", study.update);

  // Delete a study with id
  router.delete("/:id", study.delete);

  app.use("/api/study", router);
};

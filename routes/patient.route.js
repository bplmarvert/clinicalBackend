module.exports = (app) => {
  const patient = require("../controllers/patient.controller.js");

  var router = require("express").Router();
  // **************** Patients **************** //
  // Create a new patient
  router.post("/create", patient.create);

  // Retrieve all patients
  router.get("/findAll", patient.findAll);

  // Retrieve a single patient with id
  router.get("/:id", patient.findOne);

  // Update a patient with id
  router.put("/:id", patient.update);

  // Delete a patient with id
  router.delete("/:id", patient.delete);

  app.use("/api/patient", router);
};

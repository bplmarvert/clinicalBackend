module.exports = (app) => {
  const aEvent = require("../controllers/aevent.controller.js");

  var router = require("express").Router();
  // **************** Events **************** //
  // Create a new event
  router.post("/create", aEvent.create);

  // Retrieve all events
  router.get("/findAll", aEvent.findAll);

  // Retrieve a single event with id
  router.get("/:id", aEvent.findOne);

  // Update an event with id
  router.put("/:id", aEvent.update);

  // Delete an event with id
  router.delete("/:id", aEvent.delete);

  // list events for a patient
  router.get("/findByPatient/:onGoingPatientName", aEvent.findByPatient);

  app.use("/api/aEvent", router);
};

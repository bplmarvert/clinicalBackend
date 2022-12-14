const db = require("../models");
const AEvent = db.aEvent;

// Create and Save a new event
exports.create = (req, res) => {
  // Validate request
  console.log("req.body in aEvent.controller exports.create", req.body);
  if (!req.body.aEventTitle) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // The data is valid we fill it in the structure that will be saved
  const aEvent = new AEvent({
    patientName: req.body.patientName,
    aEventTitle: req.body.aEventTitle,
    aEventDesc: req.body.aEventDesc,
    aEventDt: req.body.aEventDt,
  });

  // Save event in the database
  aEvent
    .save(aEvent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "an error occurred while creating the event.",
      });
    });
};

// Retrieve all events of the patient #patientName.
exports.findAll = (req, res) => {
  const patientName = req.query.patientName;
  var condition = patientName
    ? { patientName: { $regex: new RegExp(patientName), $options: "i" } }
    : {};

  AEvent.find(condition) // like select * if empty
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the list of events of patient # " ||
          patientName,
      });
    });
};

// Find a single event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AEvent.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found event with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving evebt with id: " + id });
    });
};

// Update an Event by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    // information received by post
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  // access to the information for get and post is in the URL so PARAMS is used
  AEvent.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `The event was not found and thus we cannot update the event with id: ${id}. `,
        });
      } else res.send({ message: "Event was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating event with id: " + id,
      });
    });
};

// Delete an event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  AEvent.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `The event that has the id: ${id} was not found and cannot be deleted`,
        });
      } else {
        res.send({
          message: "Event deleted successfully!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete the Event that has id: " + id,
      });
    });
};

// Find all events of a Patient
exports.findByPatient = (req, res) => {
  const patientName = req.params.onGoingPatientName;
  //console.log("req = ", req.params);

  AEvent.find({ patientName: patientName })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving events of patient " +
            patientName,
      });
    });
};

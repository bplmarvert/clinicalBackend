const db = require("../models");
const Patient = db.patient;

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  console.log("req.body in patient.controller exports.create", req.body);
  if (!req.body.patientName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // The data is valid we fill it in the structure that will be saved
  const patient = new Patient({
    studyName: req.body.studyName,
    patientName: req.body.patientName,
    birthday: req.body.birthday,
    sex: req.body.sex,
    email: req.body.email,
  });

  // Save Patient in the database
  patient
    .save(patient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "an error occurred while creating the patient.",
      });
    });
};

// Retrieve all patient of the study #studName.
exports.findAll = (req, res) => {
  const studyName = req.query.studyName;
  var condition = studyName
    ? { studyName: { $regex: new RegExp(studyName), $options: "i" } }
    : {};

  Patient.find(condition) // like select * if empty
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the list of patient of study # " ||
          studyName,
      });
    });
};

// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Patient.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Patient with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Patient with id: " + id });
    });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    // information received by post
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  // asscess to the information for get and post is in the URL so PARAMS is used
  Patient.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `The patient was not found and thus we cannot update the patient with id: ${id}. `,
        });
      } else res.send({ message: "Patient was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Patient that has id: " + id,
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Patient.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `The patient that has the id: ${id} was not found and cannot be deleted`,
        });
      } else {
        res.send({
          message: "Patient deleted successfully!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete the Patient that has id: " + id,
      });
    });
};

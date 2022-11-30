const db = require("../models");
const Study = db.study;

// Create and Save a new Study
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studyName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Study
  const study = new Study({
    studyName: req.body.studyName,
    studyObjective: req.body.studyObjective,
    testedDrug: req.body.testedDrug,
    comparedDrug: req.body.comparedDrug,
  });

  // Save Study in the database
  study
    .save(study)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "an error occurred while creating the study.",
      });
    });
};

// Retrieve all studies from the database.
exports.findAll = (req, res) => {
  const studyName = req.query.studyName;
  var condition = studyName
    ? { studyName: { $regex: new RegExp(studyName), $options: "i" } }
    : {};

  Study.find(condition) // like select * if empty
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the list of studies.",
      });
    });
};

// Find a single Study with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Study.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Study with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Study with id: " + id });
    });
};

// Update a Study by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Study.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `The study was not found and thus we cannot update the study with id: ${id}. `,
        });
      } else res.send({ message: "Study was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Study that has id: " + id,
      });
    });
};

// Delete a Study with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Study.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `The study that has the id: ${id} was not found and cannot be deleted`,
        });
      } else {
        res.send({
          message: "Study deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete the Study that has id: " + id,
      });
    });
};

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.study = require("./study.model.js")(mongoose);
//db.investigator = require("./investigator.model.js")(mongoose);
db.patient = require("./patient.model.js")(mongoose);
db.aEvent = require("./aevent.model.js")(mongoose);

module.exports = db;

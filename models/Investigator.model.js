const Study = require("./");
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      invName: String,
      speciality: String,
      email: String,
      studyId,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Investigator = mongoose.model("investigator", schema);
  return Investigator;
};

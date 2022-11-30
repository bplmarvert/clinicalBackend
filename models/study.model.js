module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      studyName: String,
      studyObjective: String,
      testedDrug: String,
      comparedDrug: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Study = mongoose.model("study", schema);
  return Study;
};

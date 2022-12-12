module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      studyName: String,
      patientName: String,
      birthday: Date,
      sex: String,
      email: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Patient = mongoose.model("patient", schema);
  return Patient;
};

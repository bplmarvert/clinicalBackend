module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      patientName: String,
      birthday: Date,
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

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      patientName: String,
      aEventTitle: String,
      aEventDesc: String,
      aEventDt: Date,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const AEvent = mongoose.model("aEvent", schema);
  return AEvent;
};

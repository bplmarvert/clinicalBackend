module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      eventTitle: String,
      eventDesc: String,
      eventDt: Date,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const AdverseEvent = mongoose.model("adverseEvent", schema);
  return AdverseEvent;
};

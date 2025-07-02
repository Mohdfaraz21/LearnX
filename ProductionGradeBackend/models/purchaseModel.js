const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
  purchaseModel,
};

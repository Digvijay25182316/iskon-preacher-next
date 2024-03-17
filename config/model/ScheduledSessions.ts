import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  sessionName: {
    type: String,
  },
  description: {
    type: String,
  },
  counseler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counseler",
  },
});

export default mongoose.models.Scheduledsession ||
  mongoose.model("Scheduledsession", Schema);

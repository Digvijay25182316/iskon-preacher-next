import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "Session name cannot be blank"],
  },
  description: {
    type: String,
    required: [true, "Session description cannot be empty"],
  },
});

export default mongoose.models.Session || mongoose.model("Session", Schema);

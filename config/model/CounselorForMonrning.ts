import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    PrabhujiName: { type: String },
    PrabhujiPhone: { type: Number },
    MatajiName: { type: String },
    MatajiPhone: { type: Number },
    location: { type: String },
    givenAttendance: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.MorningProgram ||
  mongoose.model("MorningProgram", Schema);

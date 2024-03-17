import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name cannot be empty"],
    },
    lastName: {
      type: String,
      required: [true, "last name cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "email cannot be empty"],
    },
    education: {
      type: String,
    },
    password: {
      type: String,
      minLength: [8, "password cannot be less than 8 characters"],
      select: false,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "gender cannot be empty"],
    },
    whatsappNumber: {
      type: Number,
      min: 1000000000,
      max: 9999999999,
      required: [true, "whatsapp number cannot be empty"],
    },
    contactNumber: {
      type: Number,
      minLength: 1000000000,
      maxLength: 1000000000,
      required: [true, "contact number cannot be empty"],
    },
    dob: {
      type: Date,
      required: [true, "date of birth cannot be empty"],
    },
    initiatedName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Counseler || mongoose.model("Counseler", Schema);

import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  csrfToken: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who owns this session
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  // Additional fields can be added as needed
});

// Create a TTL index to automatically delete expired sessions
Schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.ServerSession ||
  mongoose.model("ServerSession", Schema);

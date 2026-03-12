import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true },
);

export const Message = mongoose.model("messages", messageSchema);

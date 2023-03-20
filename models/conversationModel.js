const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    readByAuthor: {
      type: String,
      required: true,
    },
    readByBuyer: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);

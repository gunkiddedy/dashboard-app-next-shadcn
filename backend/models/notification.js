const { Schema, model } = require("mongoose"),
  NOTIFICATION = model(
    "Notification",
    new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        user_id: {
          type: String,
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true },
    ),
  );

module.exports = NOTIFICATION;

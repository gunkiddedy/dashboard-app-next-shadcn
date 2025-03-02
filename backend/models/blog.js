const { Schema, model } = require("mongoose"),
  BLOG = model(
    "Blog",
    new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          default: "",
        },
        blogUrl: {
          type: String,
          required: true,
        },
      },
      { timestamps: true },
    ),
  );

module.exports = BLOG;

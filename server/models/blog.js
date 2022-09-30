import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    longDesc: { type: String },
    picture: { type: String },
    createdBy: { type: String },
  },
  {
    timestamps: true,

    // Hide password & __v from response
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("blog", blogSchema);

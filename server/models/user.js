import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    id: { type: String },
    avatar: { type: String },
    userId: { type: String },
    username: { type: String },
    picture: { type: String },
  },
  {
    timestamps: true,

    // Hide password & __v from response
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("User", userSchema);

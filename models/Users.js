import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        gender: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        followings: { type: Array, default: [] },
        followers: { type: Array, default: [] },
        profile: { type: String },
        bio: { type: String, default: "", max: 50 },
    },
    { timestamps: true }
);

export default models.user || model("user", userSchema);
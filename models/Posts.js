import { Schema, models, model } from "mongoose";

const postSchema = new Schema(
    {
        userId: { type: String },
        caption: { type: String, default: "" },
        likes: { type: Array, default: [] },
        comments: { type: Array, default: [] },
        username: { type: String },
    },
    { timestamps: true }
);

export default models.post || model("post", postSchema);

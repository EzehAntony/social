import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    const id = req.cookies["userId"];
    await dbConnect();
    try {
        const newPost = posts({
            userId: id,
            caption: req.body.caption,
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}

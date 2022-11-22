import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    try {
        const post = await posts.findById(req.body.postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(200).json(error);
    }
}

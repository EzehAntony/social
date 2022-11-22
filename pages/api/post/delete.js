import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    const id = req.cookies["userId"];
    try {
        const post = await posts.findById(req.body.postId);
        if (post.userId === id) {
            await post.deleteOne();
            res.status(200).json("Post deleted");
        } else {
            res.status(500).json("You can delete only your posts.");
        }
    } catch (error) {
        res.status(500).json(Error);
    }
}

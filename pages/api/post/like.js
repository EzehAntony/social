import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    try {
        const id = req.cookies["userId"];
        const post = await posts.findById(req.body.postId);
        if (post.likes.includes(id)) {
            await post.updateOne({
                $pull: { likes: id },
            });
            res.status(200).json("unliked");
        } else {
            const like = await post.updateOne({
                $push: { likes: id },
            });
            res.status(200).json("Liked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

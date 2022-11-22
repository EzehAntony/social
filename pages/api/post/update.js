import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";

export default async function hadler(req, res) {
    try {
        await dbConnect();
        const id = req.cookies["userId"];
        const post = await posts.findById(req.body.postId);
        if (post.userId === id) {
            await post.updateOne({
                $set: {
                    caption: req.body.caption,
                },
            });
            res.status(200).json("Post Updated");
        } else {
            res.status(500).json("You can't update someone's post.");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

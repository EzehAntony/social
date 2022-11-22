import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    const id = req.cookies["userId"];
    try {
        const post = await posts.find({ userId: id });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

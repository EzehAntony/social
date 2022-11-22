import posts from "../../../models/Posts";
import dbConnect from "../../../utils/mongodb";
import users from "../../../models/Users";
export default async function hadler(req, res) {
    await dbConnect();
    const id = req.cookies["userId"];
    try {
        const currentUser = await users.findById(id);
        const currentUserPost = await posts.find({ userId: currentUser._id });

        const friendsPost = await Promise.all(
            currentUser.followings.map((f) => {
                return posts.find({ userId: f });
            })
        );

        const finalpost = currentUserPost.concat(...friendsPost);
        const fp = finalpost.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        res.status(200).json(fp);
    } catch (error) {
        res.status(500).json(error);
    }
}

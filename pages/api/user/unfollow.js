import users from "../../../models/Users";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    const id = req.cookies["userId"];
    if (req.body.userId === id) {
        res.status(500).json("You can't unfollow yourself");
    } else {
        try {
            const currentUser = await users.findById(id);
            const userToUnfollow = await users.findById(req.body.userId);
            if (!userToUnfollow.followers.includes(currentUser._id)) {
                res.status(403).json("You are not following this user");
            } else {
                await userToUnfollow.updateOne({ $pull: { followers: currentUser._id } });
                await currentUser.updateOne({ $pull: { followings: req.body.userId } });
                res.status(200).json("User has been unfollowed");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

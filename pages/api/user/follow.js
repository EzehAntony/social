import users from "../../../models/Users";
import dbConnect from "../../../utils/mongodb";

export default async function hadler(req, res) {
    await dbConnect();
    const id = req.cookies["userId"];
    if (req.body.userId === id) {
        res.status(500).json("You can't follow yourself");
    } else {
        try {
            const currentUser = await users.findById(id);
            const userToFollow = await users.findById(req.body.userId);
            if (userToFollow.followers.includes(currentUser._id)) {
                res.status(500).json("You are already following this user");
            } else {
                await userToFollow.updateOne({ $push: { followers: currentUser._id } });
                await currentUser.updateOne({ $push: { followings: req.body.userId } });
                res.status(200).json("User has been followed");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

import users from "../../../models/Users"
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req,res) {
    await dbConnect()
    try {
        const oneUser = await users.findById(req.body.userId);
        const { password, isAdmin, ...others } = oneUser._doc;
        res.status(200).json({ ...others });
    } catch (err) {
        res.status(500).json(err);
    }
}

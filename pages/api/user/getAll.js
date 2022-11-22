import users from "../../../models/Users";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    try {
        const oneUser = await users.find();
        res.status(200).json(oneUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

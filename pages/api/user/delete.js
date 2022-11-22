import users from "../../../models/Users";
import dbConnect from "../../../utils/mongodb";
export default async function hadler(req, res) {
    await dbConnect();
    try {
        const id = req.cookies["userId"];
        await users.findByIdAndDelete(id);
        res.setHeader("Set-Cookie", [`access_token=deleted; Max-Age=0; path=/`, `userId=deleted; Max-Age=0; path=/`])
            .status(200)
            .json("User has been deleted from the database and no longer has access to the website.");
    } catch (err) {
        res.status(500).json(err);
    }
}

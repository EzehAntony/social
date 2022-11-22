import users from "../../../models/Users";
import dbConnect from "../../../utils/mongodb";
import bcryptjs from "bcryptjs";
export default async function hadler(req, res) {
    await dbConnect();
    try {
        if (req.body.password) {
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(req.body.password, salt);

            const updatedUser = await users.findByIdAndUpdate(
                req.body.userId,
                {
                    $set: {
                        username: req.body.username,
                        password: hash,
                    },
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } else {
            const updatedUser = await users.findByIdAndUpdate(
                req.body.userId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

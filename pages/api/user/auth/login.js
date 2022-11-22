import users from "../../../../models/Users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

import dbConnect from "../../../../utils/mongodb";
export default async function handler(req, res) {
    await dbConnect();
    try {
        const oneUser = await users.findOne({ username: req.body.username });
        if (!oneUser) {
            return res.status(403).json("Username does not exist");
        }

        const isPassword = await bcryptjs.compare(req.body.password, oneUser.password);

        if (!isPassword) {
            return res.status(403).json("Password is incorrect");
        }

        const token = jwt.sign(
            {
                id: oneUser._id,
                isAdmin: oneUser.isAdmin,
            },
            process.env.jwt
        );

        const { password, ...others } = oneUser._doc;
        setCookie("access_token", token, { req, res, httpOnly: true, sameSite: "lax" });
        setCookie("userId", others._id, { req, res });
        res.status(200).json({ ...others });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

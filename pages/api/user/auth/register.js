import users from "../../../../models/Users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";
import dbConnect from "../../../../utils/mongodb";

export default async function handler(req, res) {
    await dbConnect();
    const name = await users.findOne({ username: req.body.username });
    if (!name) {
        try {
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(req.body.password, salt);

            const newUser = new users({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                gender: req.body.gender,
                profile: req.body.profile,
                password: hash,
            });

            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(401).json("Username already exits");
    }
}

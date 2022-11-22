import posts from "../../../models/Posts";
export default async function hadler(req, res) {
    try {
        await posts.updateOne(
            { _id: req.params.id },
            {
                $push: {
                    comments: {
                        userId: req.body.userId,
                        comment: req.body.comment,
                    },
                },
            }
        );
        res.status(200).json("commented on post");
    } catch (error) {
        res.status(500).json(error);
    }
}

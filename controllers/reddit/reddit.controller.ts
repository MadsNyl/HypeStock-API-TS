import { Request, Response } from "express";
import { commentCount, commentCountByEachSubreddit } from "../../models/reddit/comment.reddit.model";


export const getStats = async (req: Request, res: Response) => {
    const { days } = req.query;

    if (!days) {
        return res
            .status(400)
            .send("There has to be a limit of days.");
    }

    try {
        const commentCountPerSubreddit = commentCountByEachSubreddit(Number(days));
        const totalCommentCount = commentCount();

        return res
            .status(200)
            .send({
                "commentCountPerSubreddit": commentCountPerSubreddit,
                "totalCommentCount": totalCommentCount
            })
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}
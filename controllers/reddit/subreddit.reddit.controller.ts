import { Request, Response } from "express";
import {
    allSubreddits,
    createSubreddit,
    subreddit,
    subredditCount
} from "../../models/reddit/subreddit.reddit.model";
import { commentCountBySubreddit } from "../../models/reddit/comment.reddit.model";
import { submissionCountBysubreddit } from "../../models/reddit/submission.reddit.model";


export const getAllSubreddits = async (req: Request, res: Response) => {
    const { limit, page } = req.query;

    if (!limit || !page) {
        return res
            .status(400)
            .send("There have to be a limit and a page.");
    }

    try {
        const subreddits = await allSubreddits(Number(limit), Number(page) - 1); 
        const totalSubreddits = await subredditCount();

        if (!subreddits.length || !totalSubreddits.length) {
            return res
                .status(404)
                .send("There are no subreddits.");
        }

        const totalPages = Math.ceil(Number(totalSubreddits[0].count) / Number(limit));
        let nextPageUrl: string | null;
        let prevPageUrl: string | null;

        if (totalPages === Number(page)) {
            nextPageUrl = null;
        } else {
            nextPageUrl = `/reddit/subreddit?limit=${limit}&page=${Number(page) + 1}`;
        }

        if (Number(page) <= 1) {
            prevPageUrl = null;
        } else {
            prevPageUrl = `/reddit/subreddit?limit=${limit}&page=${Number(page) - 1}`;
        }

        return res
            .status(200)
            .send({
                "next_page": nextPageUrl,
                "prev_page": prevPageUrl,
                "subreddits": subreddits
            });
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getSubreddit = async (req: Request, res: Response) => {
    const { name } = req.query;

    if (!name) {
        return res
            .status(400)
            .send("There has to be a subreddit name.");
    }

    try {
        const sub = await subreddit(name.toString());
        const commentCount = await commentCountBySubreddit(name.toString());
        const submissionCount = submissionCountBysubreddit(name.toString());

        return res
            .status(200)
            .send({
                "subreddit": sub,
                "submissionCount": submissionCount,
                "commentCount": commentCount
            })

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const addSubreddit = async (req: Request, res: Response) => {
    const { name, url } = req.body;

    if (!name || !url) {
        return res
            .status(400)
            .send("There have to be subreddit name and url.");
    }

    try {       
        await createSubreddit(name.toString(), url.toString());

        return res
            .status(204)
            .send("Subreddit created.");
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}
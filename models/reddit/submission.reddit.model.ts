import connection from "../../connection";
import Count from "../../types/count";
import {
    countBySubreddit
} from "../../queries/reddit/submission.reddit.query"

export const submissionCountBysubreddit = async (name: string): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(countBySubreddit, [name]);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving submission count by subreddit:", e);
        return [];
    }
}
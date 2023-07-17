import connection from "../../connection";
import {
    count,
    countByEachSubreddit,
    countBySubreddit
} from "../../queries/reddit/comment.reddit.query";
import Count from "../../types/count";
import CountName from "../../types/countName";


export const commentCountBySubreddit = async (name: string): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(countBySubreddit, [name]);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving comment count by subreddit:", e);
        return [];
    }
}

export const commentCount = async (): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(count);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving comment count:", e);
        return [];
    }
}

export const commentCountByEachSubreddit = async (days: number): Promise<CountName[]> => {
    try {
        const [rows] = await connection.query(countByEachSubreddit, [days]);
        return rows as CountName[];
    } catch (e) {
        console.error("Error retrieving comment count by each subreddit:", e);
        return [];
    }
}
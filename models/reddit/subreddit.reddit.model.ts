import connection from "../../connection";
import Subreddit from "../../types/subreddit";
import {
    all, 
    count, 
    create, 
    find,
    remove,
    update
} from "../../queries/reddit/subreddit.reddit.query";
import Count from "../../types/count";


export const allSubreddits = async (limit: number, page: number): Promise<Subreddit[]> => {
    try {   
        const [rows] = await connection.query(all, [limit, limit * page]);
        return rows as Subreddit[];
    } catch (e) {
        console.error("Error retrieving all subreddits:", e);
        return [];
    }
}

export const subredditCount = async (): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(count);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving subreddits count:", e);
        return [];
    }
}

export const subreddit = async (name: string): Promise<Subreddit[]> => {
    try {   
        const [rows] = await connection.query(find, [name]);
        return rows as Subreddit[];
    } catch (e) {
        console.error("Error retrieving subreddit:", e);
        return [];
    }
}

export const updateSubreddit = async (
    name: string,
    description: string,
    subscribers: number,
    url: string,
    oldName: string
) => {
    try {
        await connection.query(update, [name, description, subscribers, url, oldName]);
    } catch (e) {
        console.error("Error updating subreddit:", e);
    }
}

export const deleteSubreddit = async (name: string) => {
    try {
        await connection.query(remove, [name]);
    } catch (e) {
        console.error("Error deleting subreddit:", e);
    }
}

export const createSubreddit = async (
    name: string,
    description: string,
    subscribers: number,
    url: string
) => {
    try {
        await connection.query(create, [name, description, subscribers, url]);
    } catch (e) {
        console.error("Error creating subreddit:", e);
    }
}
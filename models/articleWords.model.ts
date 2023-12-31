import connection from "../connection";
import ArticleWord from "../types/articleWord";
import {
    all, count, create, get, remove, update
} from "../queries/articleWords.query";
import Count from "../types/count";

export const allArticleWords = async (limit: number, page: number): Promise<ArticleWord[]> => {
    try {
        const [rows] = await connection.query(all, [limit, limit * page]);
        return rows as ArticleWord[];
    } catch (e) {
        console.error("Error retrieving all article words:", e);
        return [];
    }
}

export const articleWordById = async (id: number): Promise<ArticleWord[]> => {
    try {
        const [rows] = await connection.query(get, [id]);
        return rows as ArticleWord[];
    } catch (e) {
        console.error("Error retrieving article word by id:", e);
        return [];
    }
}

export const createArticleWord = async (word: string, description: string) => {
    try {
        await connection.query(create, [word, description])
    } catch (e) {
        console.error("Error creating article word:", e);
    }
}

export const updateArticleWord = async (id: number, description: string) => {
    try {
        await connection.query(update, [description, id]);
    } catch (e) {
        console.error("Error updating article word:", e);
    }
}

export const deleteArticleWord = async (id: number) => {
    try {
        await connection.query(remove, [id]);
    } catch (e) {
        console.error("Error deleting article word:", e);
    }
}

export const articleWordsCount = async (): Promise<Count[]> => {
    try {
        const [rows] = await connection.query(count);
        return rows as Count[];
    } catch (e) {
        console.error("Error retrieving article words count:", e);
        return [];
    }
}

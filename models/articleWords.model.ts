import connection from "../connection";
import ArticleWord from "../types/articleWord";
import {
    all, create, remove, update
} from "../queries/articleWords.query";

export const allArticleWords = async (): Promise<ArticleWord[]> => {
    try {
        const [rows] = await connection.query(all);
        return rows as ArticleWord[];
    } catch (e) {
        console.error("Error retrieving all article words:", e);
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

export const updateArticleWord = async (id: number, word: string, description: string) => {
    try {
        await connection.query(update, [id, word, description]);
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
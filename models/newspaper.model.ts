import connection from "../connection";
import Newspaper from "../types/newspaper";
import { 
    all,
    create,
    get, 
    remove,
    update
} from "../queries/newspaper.query";


const allNewspapers = async (): Promise<Newspaper[]> => {
    try {
        const [rows] = await connection.query(all);
        return rows as Newspaper[];
    } catch (e) {
        console.error("Error retrieving all newspapers:", e);
        return [];
    }
}

const newspaper = async (provider: string): Promise<Newspaper[]> => {
    try {
        const [rows] = await connection.query(get, [provider]);
        return rows as Newspaper[];
    } catch (e) {
        console.error("Error retrieving newspaper by provider:", e);
        return [];
    }
}

const createNewspaper = async (provider: string, startUrl: string, baseUrl: string, fullName: string) => {
   try {
        await connection.query(create, [provider, startUrl, baseUrl, fullName]);
   } catch (e) {
        console.error("Error creating newspaper:", e);
   } 
}

const deleteNewspaper = async (provider: string) => {
    try {
        await connection.query(remove, [provider]);
    } catch (e) {
        console.error("Error deleting newspaper:", e);
    }
}

const updateNewspaper = async (
    provider: string,
    startUrl: string,
    baseUrl: string,
    fullName: string
) => {
    try {
        await connection.query(update, [provider, startUrl, baseUrl, fullName, provider]);
    } catch (e) {
        console.error("Error updating newspaper:", e);
    }
}

export {
    allNewspapers,
    newspaper,
    createNewspaper,
    deleteNewspaper,
    updateNewspaper
}
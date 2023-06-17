import connection from "../connection";
import Newspaper from "../types/newspaper";
import { 
    all,
    get 
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


export {
    allNewspapers,
    newspaper
}
import connection from "../connection";
import ConfigFile from "../types/configFile";
import {
    create,
    get
} from "../queries/config.query";

export const config = async (name: string): Promise<ConfigFile[]> => {
    try {
        const [rows] = await connection.query(get, [name]);
        return rows as ConfigFile[];
    } catch (e) {
        console.error("There occured an error with retrieving the config file:", e);
        return [];
    }
}

export const createConfig = async (name: string, url: string) => {
    try {
        await connection.query(create, [name, url]);
    } catch (e) {
        console.error("There occured an error with creating a config file:", e);
    }
}
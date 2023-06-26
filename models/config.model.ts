import connection from "../connection";
import ConfigFile from "../types/configFile";
import {
    create,
    get,
    getById,
    remove,
    update
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

export const configById = async (id: number): Promise<ConfigFile[]> => {
    try {
        const [rows] = await connection.query(getById, [id]);
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

export const removeConfig = async (id: number) => {
    try {
        await connection.query(remove, [id]);
    } catch (e) {
        console.error("There occured an error with deleting the config file:", e);
    }
}

export const updateConfig = async (name: string, url: string) => {
    try {
        await connection.query(update, [url, name]);
    } catch (e) {
        console.error("There occured an error when updating the config file:", e);
    }
}
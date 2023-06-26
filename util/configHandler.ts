import ConfigSection from "../types/configSection";


type Data = {
    [key: string]: any;
}

export const getConfigSection = async (url: string, key: string): Promise<Data | undefined> => {
    try {

        const response = await fetch(url);
        const jsonData: Data = await response.json();

        if (jsonData.hasOwnProperty(key)) {
            return jsonData[key];
        }

        console.log(`Key ${key} not found in json.`);
        return undefined;

    } catch (e) {
        console.error("An error occured trying to fetch the configure file:", e);
        return undefined;
    }
} 

export const alterConfigSection = async (url: string, objects: ConfigSection[]): Promise<Data> => {
    try {

        const response = await fetch(url);
        const jsonData: Data = await response.json();

        for (const obj of objects) {
            jsonData[obj.key] = obj.value;
        }

        return jsonData;

    } catch (e) {
        console.error("An error occured trying to fetch the configure file:", e);
        return {};
    }
}
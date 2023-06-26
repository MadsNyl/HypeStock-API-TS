import { Request, Response, json } from "express";
import { fileDelete, fileUpload, jsonUpdate } from "../util/fileHandler";
import { UploadedFile } from "express-fileupload";
import { config, configById, createConfig, removeConfig, updateConfig } from "../models/config.model";
import { alterConfigSection, getConfigSection } from "../util/configHandler";
import ConfigSection from "../types/configSection";


export const getConfig = async (req: Request, res: Response) => {
    
    const { name } = req.query;
    
    if (!name) {
        return res
            .status(400)
            .send("There has to be a file name.");
    }

    try {
        const configFile = await config(name.toString());

        return res
            .status(200)
            .send({
                "config": configFile
            });
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const addConfig = async (req: Request, res: Response) => {
    const file = req.files?.file;

    if (!file) {
        return res
            .status(400)
            .send("There has to be a file.");
    }

    try {
        const uploadUrl = await fileUpload(file as UploadedFile, "config");
        const fileName = (file as UploadedFile).name;
        
        await createConfig(fileName, uploadUrl);

        return res
            .status(201)
            .send("Config file created.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const deleteConfig = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res
            .status(400)
            .send("There has to be an id.");
    }

    try {
        const configFile = await configById(Number(id));

        if (!configFile.length) {
            return res
                .status(404)
                .send("There is no config file with this id.");
        }

        await fileDelete(configFile[0].name, "config");
        await removeConfig(Number(id));

        return res
            .status(204)
            .send("The config file is deleted.");
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const getConfigData = async (req: Request, res: Response) => {
    
    const { key } = req.query;
    
    if (!key) {
        return res
            .status(400)
            .send("There has to be an key provided.");
    }

    try {
        const configFile = await config("config.json");

        if (!configFile.length) {
            return res
                .status(404)
                .send("There is no config file with this name.");
        }

        const jsonData = await getConfigSection(configFile[0].url, key.toString());

        if (!jsonData) {
            return res
                .status(404)
                .send("No configures found for this section.");
        }

        return res
            .status(200)
            .send(jsonData);
    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }
}

export const editConfig = async (req: Request, res: Response) => {

    const { section } = req.body;

    if (!section) {
        return res
            .status(400)
            .send("There has to be a section.");
    }

    try {
        const fileName = "config.json";
        const containerName = "config";

        const sectionObjects = Object.entries(section).map(([key, value]) => ({ key, value }));
        const configFile = await config(fileName); 

        if (!configFile.length) {
            return res
                .status(404)
                .send("There is no config file with this name.");
        }

        const newConfigFile = await alterConfigSection(configFile[0].url, sectionObjects as ConfigSection[]);

        const uploadUrl = await jsonUpdate(newConfigFile, containerName, fileName);

        await updateConfig(fileName, uploadUrl);

        return res
            .status(204)
            .send("Config file updated.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("There occured an error.");
    }

}
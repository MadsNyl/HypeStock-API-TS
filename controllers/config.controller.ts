import { Request, Response } from "express";
import { fileUpload } from "../util/fileHandler";
import { UploadedFile } from "express-fileupload";
import { config, createConfig } from "../models/config.model";


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
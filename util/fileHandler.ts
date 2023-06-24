import { BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { AZURE_CONNECTION_STRING } from "../settings";
import { Readable } from "stream";
import { UploadedFile } from 'express-fileupload';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_CONNECTION_STRING || "");


export const fileUpload = async (file: UploadedFile, containerName: string): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    await blockBlobClient.uploadStream(Readable.from(file.data), file.data.length);

    const response: BlobUploadCommonResponse = await blockBlobClient.getProperties();
    const uploadUrl = response._response.request.url;

    return uploadUrl;
}
import { Request } from "express";



export interface UserRequest extends Request {
    username?: string;
    role?: number;
}
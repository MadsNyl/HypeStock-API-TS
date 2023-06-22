import connection from "../connection";
import {
    find,
    findByRefreshToken,
    updateRefreshToken,
    create,
    allByRole,
    update
} from "../queries/user.query";
import User from "../types/user";


export const findUserByUsername = async (username: string): Promise<User[]>  => {
    try {
        const [rows] = await connection.query(find, [username]);
        return rows as User[];
    } catch (e) {
        console.error("Error retrieving a user by username:", e);
        return [];
    }
}

export const usersByRole = async (role: number): Promise<User[]> => {
    try {
        const [rows] = await connection.query(allByRole, [role]);
        return rows as User[];
    } catch (e) {
        console.error("Error retrieving all users by role", e);
        return [];
    }
}

export const updateUserRefreshToken = async (refreshToken: string, username: string) => {
    try {
        await connection.query(updateRefreshToken, [refreshToken, username]);
    } catch (e) {
        console.error("Error updating refreshtoken for a user:", e);
    }
}

export const updateUser = async (username: string, password: string) => {
    try {
        await connection.query(update, [password, username])
    } catch (e) {
        console.error("Error updating a user:", e);
    }
}

export const createUser = async (username: string, password: string, role: number) => {
    try {
        await connection.query(create, [username, password, role]);
    } catch (e) {
        console.error("Error updating creating user:", e);
    }
}

export const findUserByRefreshToken = async (refreshToken: string): Promise<User[]> => {
    try {
        const [rows] = await connection.query(findByRefreshToken, [refreshToken]);
        return rows as User[];
    } catch (e) {
        console.error("Error retrieving a user by refresh token:", e);
        return [];
    }
}
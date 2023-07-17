

export const find = `
    SELECT *
    FROM users
    WHERE username = ?;
`;

export const allByRole = `
    SELECT *
    FROM users
    WHERE role = ?;
`;

export const findByRefreshToken = `
    SELECT *
    FROM users
    WHERE refresh_token = ?;
`;

export const updateRefreshToken = `
    UPDATE users
    SET refresh_token = ?
    WHERE username = ?;
`;

export const create = `
    INSERT INTO users
    (username, password, role)
    VALUES (?, ?, ?);
`;

export const update = `
    UPDATE users
    SET
        username = ?,
        first_name = ?,
        last_name = ?
    WHERE username = ?;
`;

export const editPassword = `
    UPDATE users
    SET
        password = ?
    WHERE username = ?;
`;

export const updateRole = `
    UPDATE users
    SET
        role = ?
    WHERE username = ?;
`;
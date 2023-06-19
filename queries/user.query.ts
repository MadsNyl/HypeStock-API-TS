

export const find = `
    SELECT *
    FROM users
    WHERE username = ?;
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
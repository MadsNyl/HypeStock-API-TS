

export const get = `
    SELECT *
    FROM config_file
    WHERE name = ?;
`;

export const create = `
    INSERT INTO config_file
    (name, url)
    VALUES (?, ?);
`;
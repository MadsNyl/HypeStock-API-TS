

export const get = `
    SELECT *
    FROM config_file
    WHERE name = ?;
`;

export const getById = `
    SELECT *
    FROM config_file
    WHERE id = ?;
`;

export const create = `
    INSERT INTO config_file
    (name, url)
    VALUES (?, ?);
`;

export const remove = `
    DELETE FROM
    config_file
    WHERE id = ?;
`;

export const update = `
    UPDATE config_file
    SET
        url = ?
    WHERE name = ?;
`;
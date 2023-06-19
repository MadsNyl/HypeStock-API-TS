

export const all = `
    SELECT *
    FROM newspaper;
`;

export const get = `
    SELECT *
    FROM newspaper
    WHERE provider = ?;
`;

export const create = `
    INSERT INTO newspaper
    (provider, start_url, base_url, full_name)
    VALUES (?, ?, ?, ?);
`;

export const remove = `
    DELETE
    FROM newspaper
    WHERE provider = ?;
`;

export const update = `
    UPDATE newspaper
    SET
        provider = ?,
        start_url = ?,
        base_url = ?,
        full_name = ?
    WHERE provider = ?;
`;
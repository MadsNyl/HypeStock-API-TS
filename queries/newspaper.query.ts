

export const all = `
    SELECT *
    FROM newspaper;
`;

export const get = `
    SELECT *
    FROM newspaper
    WHERE provider = ?;
`;
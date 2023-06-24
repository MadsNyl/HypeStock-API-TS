

export const all = `
    SELECT *
    FROM ticker;
`;

export const bySymbol = `
    SELECT *
    FROM ticker
    WHERE symbol = ?;
`;

export const bySymbolSearch = `
    SELECT *
    FROM ticker
    WHERE symbol LIKE ?
    LIMIT ?;
`;

export const byName = `
    SELECT *
    FROM ticker
    WHERE name LIKE ?;
`;

export const bySearch = `
    SELECT *
    FROM ticker
    ORDER BY
    (CASE WHEN symbol = ? THEN 1 END) DESC,
    (CASE WHEN name LIKE ? THEN 1 END) DESC
    LIMIT ?
`;
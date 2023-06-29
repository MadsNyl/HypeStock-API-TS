

export const get = `
    SELECT *
    FROM statement
    WHERE id = ?;
`;

export const getByFiling = `
    SELECT *
    FROM statement
    WHERE filing = ?;
`;

export const getTitles = `
    SELECT *
    FROM statement_title
    WHERE statement = ?;
`;

export const getDates = `
    SELECT id, DATE_FORMAT(date, '%d-%m-%y') AS date, statement, sequence
    FROM statement_date
    WHERE statement = ?;
`;

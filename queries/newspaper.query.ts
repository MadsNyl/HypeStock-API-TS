

export const all = `
    SELECT newspaper.*, COUNT(article.id) as article_count
    FROM newspaper
    LEFT JOIN article 
    ON newspaper.provider = article.provider
    GROUP BY newspaper.provider;
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
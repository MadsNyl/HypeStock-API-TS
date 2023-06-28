

export const all = `
    SELECT newspaper.*, COALESCE(article_count, 0) AS article_count
    FROM newspaper
    LEFT JOIN (
        SELECT provider, COUNT(id) AS article_count
        FROM article
        WHERE created_date >= DATE(NOW() - INTERVAL 7 DAY)
        GROUP BY provider
    ) AS article_counts
    ON newspaper.provider = article_counts.provider;
`;

export const get = `
    SELECT newspaper.*, COUNT(article.id) AS article_count
    FROM newspaper
    LEFT JOIN article 
    ON newspaper.provider = article.provider
    WHERE newspaper.provider = ?
    AND article.created_date >= DATE(NOW() - INTERVAL 7 DAY);
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
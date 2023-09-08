

export const all = `
    SELECT *
    FROM ticker;
`;

export const popular = `
    SELECT COUNT(article_ticker.symbol) AS count, ticker.* FROM ticker
    INNER JOIN
    article_ticker ON ticker.symbol = article_ticker.symbol
    INNER JOIN
    article on article_ticker.article_id = article.id
    WHERE article.collected_date >= DATE(NOW() - INTERVAL 7 DAY)
    GROUP BY ticker.symbol
    ORDER BY count DESC
    LIMIT ?;
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
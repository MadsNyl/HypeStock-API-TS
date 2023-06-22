

export const all = `
    SELECT *
    FROM article;
`;

export const get = `
    SELECT *
    FROM article
    WHERE id = ?,
`;

export const byTicker = `
    SELECT article.*
    FROM article_ticker
    INNER JOIN article
    ON article_ticker.article_id = article.id
    WHERE article_ticker.symbol = ?
    ORDER BY article.created_date DESC
    LIMIT ?;
`;

export const byTickerAndDays = `
    SELECT article.*
    FROM article_ticker
    INNER JOIN article
    ON article_ticker.article_id = article.id
    WHERE article_ticker.symbol = ?
    AND article.created_date >= DATE(NOW() - INTERVAL ? DAY)
    ORDER BY article.created_date DESC
    LIMIT ?;
`;

export const countByTickerAndDays = `
    SELECT DATE(article.created_date) as date, COUNT(*) as count
    FROM article_ticker
    INNER JOIN article
    ON article_ticker.article_id = article.id
    WHERE article_ticker.symbol = ?
    AND article.created_date >= DATE(NOW() - INTERVAL ? DAY)
    GROUP BY date
    ORDER BY date DESC;
`;

export const countByProvidersAndDays = `
    SELECT article.provider, COUNT(*) as count
    FROM article_ticker
    INNER JOIN article
    ON article_ticker.article_id = article.id
    WHERE article_ticker.symbol = ?
    AND article.created_date >= DATE(NOW() - INTERVAL ? DAY)
    GROUP BY article.provider
    ORDER BY count DESC;
`;

export const countByTickers = `
    SELECT symbol, COUNT(*) as count
    FROM article_ticker
    GROUP BY symbol
    ORDER BY count DESC;
`;

export const byProvider = `
    SELECT *
    FROM article
    WHERE provider = ?
    ORDER BY created_date DESC
    LIMIT ?
`;

export const tickers = `
    SELECT symbol
    FROM article_ticker
    WHERE article_id = ?;
`;

export const count = `
    SELECT COUNT(*) AS count
    FROM article;
`;

export const countLastDay = `
    SELECT COUNT(*) AS count
    FROM article
    WHERE created_date >= DATE(NOW() - INTERVAL 24 HOUR);
`;

export const countByDays = `
    SELECT COUNT(*) AS count
    FROM article
    WHERE created_date >= DATE(NOW() - INTERVAL ? DAY);
`;

export const countEachHour = `
    SELECT DATE_FORMAT(created_date, '%Y-%m-%d %H:00:00') AS hour, COUNT(*) AS count
    FROM article
    WHERE created_date >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    GROUP BY hour
    ORDER BY hour;
`;

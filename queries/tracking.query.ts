

export const allByTicker = `
    SELECT *
    FROM tracking
    WHERE symbol = ?;
`;

export const byTickerAndDays = `
    SELECT *
    FROM tracking
    WHERE symbol = ?
    AND date >= DATE(NOW() - INTERVAL ? DAY)
    ORDER BY date DESC;
`;
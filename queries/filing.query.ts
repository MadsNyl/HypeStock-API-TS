

export const getByCik = `
    SELECT id, type, DATE_FORMAT(created_date, '%d-%m-%y') AS created_date, url, cik
    FROM filing
    WHERE cik = ?;
`;
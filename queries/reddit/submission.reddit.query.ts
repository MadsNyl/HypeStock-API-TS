

export const all = `
    SELECT *
    FROM submission;
`;

export const find = `
    SELECT *
    FROM submission
    WHERE id = ?;
`;

export const findBySubreddit = `
    SELECT *
    FROM submission
    WHERE subreddit = ?;
`;

export const countBySubreddit = `
    SELECT COUNT(*) AS count
    FROM submission
    WHERE subreddit = ?;
`;
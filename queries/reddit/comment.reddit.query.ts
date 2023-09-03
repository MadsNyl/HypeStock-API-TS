

export const all = `
    SELECT *
    FROM reddit_comment;
`;

export const find = `
    SELECT *
    FROM reddit_comment
    WHERE id = ?;
`;

export const findBySubmission = `
    SELECT *
    FROM reddit_comment
    WHERE submission = ?;
`;

export const findBySubreddit = `
    SELECT *
    FROM reddit_comment
    WHERE subreddit = ?;
`;

export const count = `
    SELECT COUNT(*) AS count
    FROM reddit_comment;
`;

export const countBySubmission = `
    SELECT COUNT(*) AS count
    FROM reddit_comment
    WHERE submission = ?;
`;

export const countBySubreddit = `
    SELECT COUNT(*) AS count
    FROM reddit_comment
    WHERE subreddit = ?;
`;

export const countByTicker = `
    SELECT COUNT(*) AS count
    FROM reddit_ticker
    INNER JOIN
    reddit_comment ON
    reddit_ticker.comment = reddit_comment.id
    WHERE reddit_ticker.ticker = ?;
`;

export const countByEachSubreddit = `
    SELECT subreddit.name, COUNT(reddit_comment.id) AS count
    FROM subreddit
    INNER JOIN
    reddit_comment
    ON subreddit.name = reddit_comment.subreddit
    WHERE reddit_comment.collected_date >= DATE(NOW() - INTERVAL ? DAY)
    GROUP BY subreddit.name;
`;
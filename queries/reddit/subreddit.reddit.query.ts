

export const all = `
    SELECT *
    FROM subreddit
    LIMIT ?
    OFFSET ?; 
`;

export const count = `
    SELECT COUNT(*) AS count
    FROM subreddit;
`;

export const find = `
    SELECT *
    FROM subreddit
    WHERE name = ?;
`;

export const update = `
    UPDATE subreddit
    SET
        name = ?,
        description = ?,
        subscribers = ?,
        url = ?
    WHERE name = ?;
`;

export const remove = `
    DELETE
    FROM subreddit
    WHERE name = ?;
`;

export const create = `
    INSERT
    INTO subreddit
    (name, description, subscribers, url);
`;
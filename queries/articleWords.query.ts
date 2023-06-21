

export const all = `
    SELECT *
    FROM article_word;
`;

export const remove = `
    DELETE
    FROM article_word
    WHERE id = ?;
`;

export const create = `
    INSERT INTO
    article_word
    (word, description)
    VALUES (?, ?);
`;

export const update = `
    UPDATE article_word
    SET
        word = ?,
        description = ?
    WHERE id = ?;
`;
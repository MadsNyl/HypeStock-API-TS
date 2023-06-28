

export const getInitialFigures = `
    SELECT *
    FROM figure
    WHERE statement = ?;
`;


export const getFigureValues = `
    SELECT DISTINCT figure_value.*
    FROM figure_value
    INNER JOIN
    figure ON figure_value.figure = figure.id
    INNER JOIN 
    statement ON figure.statement = ?;
`;

export const getStatement = `
    SELECT *
    FROM statement
    WHERE id = ?;
`;

export const getStatementTitles = `
    SELECT *
    FROM statement_title
    WHERE statement = ?;
`;

export const getStatementDates = `
    SELECT id, DATE_FORMAT(date, '%d-%m-%y') AS date, statement, sequence
    FROM statement_date
    WHERE statement = ?;
`;
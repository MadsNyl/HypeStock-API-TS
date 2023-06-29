

export const get = `
    SELECT *
    FROM figure
    WHERE statement = ?;
`;


export const getValues = `
    SELECT DISTINCT figure_value.*
    FROM figure_value
    INNER JOIN
    figure ON figure_value.figure = figure.id
    INNER JOIN 
    statement ON figure.statement = ?;
`;
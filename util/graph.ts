import Figure, { FigureGraph, FigureValue } from "../types/figure";


export const buildGraph = (figures: Figure[]): FigureGraph => {
    const graph: FigureGraph = {};

    figures.forEach(figure => {
        figure.children = [];
        graph[figure.id] = figure;
    });

    figures.forEach(figure => {
        const parentId = figure.parent_id;

        if (parentId && graph[parentId]) {
            graph[parentId].children?.push(figure);
        }
    });

    const roots: Figure[] = figures.filter(figure => !figure.has_parent);
    
    const graphDict: FigureGraph = {};
    
    roots.forEach(root => {
        graphDict[root.id] = root;
    });

    return graphDict;
}
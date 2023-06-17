import Symbol from "./symbol";

type Article =  {
    id: number,
    title: string,
    url: string,
    provider: string,
    created_date: Date,
    tickers?: Symbol[] 
}

type ArticleCount = {
    name: string,
    count: number
}

export default Article;
export {
    ArticleCount
}
import Article from "./article";

type Newspaper =  {
    provider: string;
    start_url: string;
    base_url: string;
    full_name: string;
    logo: string;
    article_count?: number;
    articles?: Article[];
}

export default Newspaper;
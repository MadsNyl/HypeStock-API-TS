import Article from "./article";

type Newspaper =  {
    provider: string;
    start_url: string;
    base_url: string;
    articles?: Article[];
}

export default Newspaper;
export interface NewsAPIResponse {
  articles: Array<{
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: {
      name: string;
    };
  }>;
}

export interface SummarizedNews {
  title: string;
  summary: string;
  category: string;
  sourceURL: string;
  publishedAt: Date;
}

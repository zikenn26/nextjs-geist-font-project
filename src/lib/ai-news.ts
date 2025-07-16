import OpenAI from 'openai';
import { NewsAPIResponse, SummarizedNews } from '@/types/news';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export async function fetchExamNews(): Promise<NewsAPIResponse> {
  const searchTerms = [
    'UPSC 2025 notification',
    'JEE Advanced 2025 update',
    'SSC exam date 2025',
    'Banking exam notification 2025',
    'GATE 2025 notification',
    'Defence exam 2025',
    'NEET 2025 update',
    'CAT 2025 notification',
    'CLAT 2025 update',
    'IBPS exam 2025'
  ];

  const allArticles: NewsArticle[] = [];
  
  for (const term of searchTerms) {
    try {
      const response = await fetch(
        `${NEWS_API_URL}?q=${encodeURIComponent(term)}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&pageSize=5`
      );
      
      if (response.ok) {
        const data = await response.json();
        allArticles.push(...data.articles);
      }
    } catch (error) {
      console.error(`Error fetching news for term "${term}":`, error);
    }
  }

  // Remove duplicates based on URL
  const uniqueArticles = allArticles.filter((article, index, self) =>
    index === self.findIndex(a => a.url === article.url)
  );

  return { articles: uniqueArticles };
}

export async function summarizeNews(articles: NewsArticle[]): Promise<SummarizedNews[]> {
  const summaries: SummarizedNews[] = [];
  
  for (const article of articles.slice(0, 10)) {
    try {
      const prompt = `
        Summarize this exam-related news article in 2-3 sentences. Focus on key details like exam dates, notifications, eligibility, or important updates.
        
        Title: ${article.title}
        Description: ${article.description}
        
        Provide a concise summary that would be useful for exam aspirants. Return only the summary text.
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
      });

      const summary = completion.choices[0]?.message?.content || article.description;
      
      // Categorize the news
      const categoryPrompt = `
        Categorize this exam news into one of these categories: UPSC, JEE, SSC, Banking, GATE, Defence, NEET, CAT, CLAT, IBPS, Other.
        
        Title: ${article.title}
        
        Return only the category name.
      `;

      const categoryCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: categoryPrompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 10,
      });

      const category = categoryCompletion.choices[0]?.message?.content || 'Other';

      summaries.push({
        title: article.title,
        summary: summary.trim(),
        category,
        sourceURL: article.url,
        publishedAt: new Date(article.publishedAt),
      });
      
    } catch (error) {
      console.error('Error summarizing article:', error);
      // Fallback to original description
      summaries.push({
        title: article.title,
        summary: article.description || 'No summary available',
        category: 'Other',
        sourceURL: article.url,
        publishedAt: new Date(article.publishedAt),
      });
    }
  }
  
  return summaries;
}

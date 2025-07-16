import { fetchExamNews, summarizeNews } from '@/lib/ai-news';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

async function fetchAndSaveNews() {
  try {
    console.log('Starting news fetch...');
    await dbConnect();

    // Fetch and summarize news
    const newsData = await fetchExamNews();
    console.log(`Fetched ${newsData.articles.length} articles`);

    const summaries = await summarizeNews(newsData.articles);
    console.log(`Summarized ${summaries.length} articles`);

    // Save to database
    let savedCount = 0;
    for (const item of summaries) {
      // Check if news already exists
      const existing = await News.findOne({ sourceURL: item.sourceURL });
      if (!existing) {
        const news = new News({
          title: item.title,
          summary: item.summary,
          category: item.category,
          sourceURL: item.sourceURL,
          publishedAt: item.publishedAt,
        });
        await news.save();
        savedCount++;
      }
    }

    console.log(`Successfully saved ${savedCount} new articles`);
    process.exit(0);
  } catch (error) {
    console.error('Error in fetchAndSaveNews:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fetchAndSaveNews();
}

export { fetchAndSaveNews };

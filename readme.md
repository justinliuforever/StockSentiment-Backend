## MongoDB Structure:

Ticker: U
Name: Zacks Investment Research
Home Page URL: https://www.zacks.com/
Logo URL: https://s3.polygon.io/public/assets/news/logos/zacks.png
Title: Unity Software Inc. (U) Just Overtook the 50-Day Moving Average
Article URL: https://www.zacks.com/stock/news/2190838/unity-software-inc-u-just-overtook-the-50-day-moving-average
Author: Zacks Equity Research
Description: Good things could be on the horizon when a stock surpasses the 50-Day simple moving average. How should investors react?
Content: Unity Software Inc. (U Quick QuoteU - Free Report) is looking like an interesting pick from a technical perspective, as the company reached a key level of support. Recently, U broke out above the 50-day moving average, suggesting a short-term bullish trend.......
Published UTC: 2023-11-29T14:30:04Z
Publisher: Zacks Investment Research

## backend

npm init -y  (install package .json file)

npm i express nodemon

npm i mongoose

npm i cors

npm install puppeteer

npm install openai@^4.0.0

### Scrapying

npm install axios

In this schema:

- `title`: Stores the title of the stock analysis.
- `articleUrl`: Stores the URL of the article.
- `author`: Stores the name of the author.
- `description`: Stores a short description of the article.
- `content`: Stores content of the article.
- `publishedUTC`: Stores the publication date and time in UTC. It is defined as a Date type to facilitate date-related queries and operations.
- `publisher`: Stores the name of the publisher.

The `timestamps: true` option in the schema definition will automatically add `createdAt` and `updatedAt` fields to your documents, which can be very useful for tracking when a record was created or last modified.





### addNewsArticles() Function

获得MongoDB端的Stock Data, 然后过滤一下 newsCompanyName(因为有些web用RapidAPI爬不了). -> 用RapidAPI访问每个Stock Data中的url, 获得article的content部分(间隔4seconds). -> 最后把content部分 put到MongoDB上.





Website:

Rapid API (Scarping the news content) :"https://rapidapi.com/developer/dashboard", "https://rapidapi.com/lexper/api/article-data-extraction-and-text-mining" 这里使用的是ujeebu api, 是一个data extraction的api, combine with the power of machine learning, 能够更加智能的extract the content from a news webapge. 

Polygon.io  (Geting the news comprehensive inform) API :"https://polygon.io/dashboard/"

ChatGPT (News Analysis): "https://platform.openai.com/usage"

MongoDB (Backend database) :"https://cloud.mongodb.com/"



**Run Program:**

Frontend: "npm run dev"

**Backend:** 

​	Database:  npm run dev

​	Scarping: node scraping/main.ks


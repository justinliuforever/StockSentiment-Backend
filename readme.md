# Stock Analysis Platform Backend

## Introduction

Welcome to the backend of our Stock Analysis Platform, a sophisticated system designed for financial analysts and stock market enthusiasts. This platform offers a comprehensive suite of tools for analyzing and interpreting stock market data, leveraging advanced technologies and data sources.

### Key Features:

- **Database Interaction**: Easily interact with our MongoDB database to store and retrieve stock analyses.
- **Data Extraction**: Utilize Rapid API for scraping news content, combining the power of machine learning for intelligent content extraction.
- **Comprehensive Information**: Access detailed stock information from Polygon.io.
- **Advanced Analysis**: Employ ChatGPT for in-depth news analysis, providing insightful predictions and trends.

### Technologies Used:

- **Express.js**: For building our API and handling route requests.
- **Mongoose**: To model and manage data in our MongoDB database.
- **CORS**: To enable cross-origin requests.
- **Puppeteer**: For web scraping functionalities.
- **OpenAI (ChatGPT)**: For leveraging AI-driven analysis.

### Third-Party Services:

- **Rapid API**: ([Dashboard](https://rapidapi.com/developer/dashboard)) & ([Article Data Extraction](https://rapidapi.com/lexper/api/article-data-extraction-and-text-mining)): Used for efficient and intelligent data extraction from news web pages.
- **Polygon.io**: ([API Dashboard](https://polygon.io/dashboard/)): Provides comprehensive stock information.
- **ChatGPT**: ([Usage](https://platform.openai.com/usage)): For AI-driven news analysis.
- **MongoDB**: ([Cloud Database](https://cloud.mongodb.com/)): As our backend database.

**Backend:**
Database: npm run dev

### MongoDB Structure:

{
"ticker": "AAPL",
"name": "Apple Inc.",
"homePageURL": "https://www.apple.com",
"logoURL": "https://example.com/logo/aapl.png",
"title": "Apple Stock Analysis",
"articleURL": "https://example.com/articles/apple-analysis",
"imageURL": "https://example.com/images/apple-stock.jpg",
"author": "John Doe",
"description": "An in-depth analysis of Apple Inc. stock.",
"content": "This article provides a detailed analysis of Apple Inc., including its financial performance, market trends, and future outlook.",
"chatGPTAnalysis": {
"shortTermPrediction": "Bullish for the next quarter",
"longTermPrediction": "Steady growth over the next five years"
},
"publishedUTC": "2024-01-09T12:00:00Z",
"publisher": "Market Insights"
}

### backend dependency

npm init -y (install package .json file)

npm i express nodemon

npm i mongoose

npm i cors

npm install puppeteer

npm install openai@^4.0.0

### Website (the website that using in this project):

Rapid API (Scarping the news content) :"https://rapidapi.com/developer/dashboard", "https://rapidapi.com/lexper/api/article-data-extraction-and-text-mining" 这里使用的是 ujeebu api, 是一个 data extraction 的 api, combine with the power of machine learning, 能够更加智能的 extract the content from a news webapge.

Polygon.io (Geting the news comprehensive inform) API :"https://polygon.io/dashboard/"

ChatGPT (News Analysis): "https://platform.openai.com/usage"

MongoDB (Backend database) :"https://cloud.mongodb.com/"

### Backend Routes

#### 1. POST `/`

Saves a new stock analysis. Requires all fields of the `StockAnalysis` schema in the request body. Returns a 400 status for missing fields.

#### 2. GET `/`

Retrieves all stock analyses. Returns a JSON object with the count and the data.

#### 3. GET `/:id`

Fetches a single stock analysis by its ID. Returns a 404 status if not found.

#### 4. GET `/ticker/:ticker`

Retrieves stock analyses by ticker symbol. Supports optional `minDate` and `maxDate` query parameters for date filtering. Returns a 404 status if no analyses are found.

#### 5. PUT `/:id`

Updates a stock analysis by its ID. Returns a 404 status if the analysis is not found.

#### 6. DELETE `/:id`

Deletes a stock analysis by its ID. Returns a 404 status if the analysis is not found.

#### 7. DELETE `/ticker/:ticker`

Deletes stock analyses by ticker symbol with optional date range (`minDate`, `maxDate`). Returns a 404 status if no analyses are found for deletion.

#### 8. PUT `/updateByTicker/:ticker`

Updates a stock analysis by ticker symbol. Returns a 404 status if no analysis is found with the given ticker.

#### 9. GET `/stockData/:symbol/:date`

Fetches stock data from Polygon.io for a given symbol and date. Returns a 500 status if there is an error in fetching the data.

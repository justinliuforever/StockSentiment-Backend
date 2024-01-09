import {POLYGON_API_KEY} from '.././config.js';
import { StockAnalysis } from '../models/stockAnalysisModel.js';
import axios from 'axios';
import express from 'express';

const router = express.Router();

// Route for saving a new stock analysis
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body
  try {
    // Check for required fields
    if (
      !req.body.ticker ||
      !req.body.name ||
      !req.body.homePageURL ||
      !req.body.logoURL ||
      !req.body.title ||
      !req.body.articleURL ||
      !req.body.imageURL ||
      !req.body.author ||
      !req.body.description ||
      !req.body.content ||
      !req.body.chatGPTAnalysis ||
      !req.body.chatGPTAnalysis.shortTermPrediction ||
      !req.body.chatGPTAnalysis.longTermPrediction ||
      !req.body.publishedUTC ||
      !req.body.publisher
    ) {
      return res.status(400).send({ msg: 'Please include all fields' });
    }

    const newStockAnalysis = new StockAnalysis(req.body);
    const stockAnalysis = await newStockAnalysis.save();
    return res.status(201).send(stockAnalysis);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
});

// Route for getting all stock analyses
router.get('/', async (req, res) => {
  try {
    const stockAnalyses = await StockAnalysis.find({});
    return res.status(200).json({
      count: stockAnalyses.length,
      data: stockAnalyses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// Route for getting a single stock analysis by id
router.get('/:id', async (req, res) => {
  console.log('Search ID Request:', req.params); // Log the request params
  try {
    const { id } = req.params;
    const stockAnalysis = await StockAnalysis.findById(id);

    if (!stockAnalysis) {
      return res.status(404).send({ msg: 'Stock Analysis not found' });
    }

    return res.status(200).json(stockAnalysis);
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// Route for getting stock analysis by ticker symbol with optional date filters
router.get('/ticker/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minDate, maxDate } = req.query;

    let query = { ticker: ticker };

    if (minDate || maxDate) {
      query.publishedUTC = {};
      if (minDate) {
        // Greater than or equal to minDate
        query.publishedUTC.$gte = minDate;
      }
      if (maxDate) {
        // Less than or equal to maxDate
        query.publishedUTC.$lte = maxDate;
      }
    }

    const stockAnalyses = await StockAnalysis.find(query);

    if (stockAnalyses.length === 0) {
      return res.status(404).send({ msg: 'No stock analysis found for the given criteria' });
    }

    return res.status(200).json({
      count: stockAnalyses.length,
      data: stockAnalyses
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// Route for updating a stock analysis
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await StockAnalysis.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send({ msg: 'Stock Analysis not found' });
    }

    return res.status(200).send({ msg: 'Stock Analysis updated', data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// Route for deleting a stock analysis
router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const result = await StockAnalysis.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ msg: 'Stock Analysis not found' });
    }
    return res.status(200).send({ msg: 'Stock Analysis deleted' });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// Route for deleting stock analysis data by ticker symbol with optional date range
router.delete('/ticker/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const { minDate, maxDate } = req.query;

    let query = { ticker: ticker };

    if (minDate || maxDate) {
      query.publishedUTC = {};
      if (minDate) {
        // Greater than or equal to minDate
        query.publishedUTC.$gte = minDate;
      }
      if (maxDate) {
        // Less than or equal to maxDate
        query.publishedUTC.$lte = maxDate;
      }
    }

    const deletionResult = await StockAnalysis.deleteMany(query);

    if (deletionResult.deletedCount === 0) {
      return res.status(404).send({ msg: 'No stock analysis found for the given criteria, nothing deleted' });
    }

    return res.status(200).send({ msg: 'Stock analysis data deleted successfully', deletedCount: deletionResult.deletedCount });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// Route for updating stock analysis by unique identifier (e.g., ticker symbol)
router.put('/updateByTicker/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;  // Extract the ticker from URL params
    const updateData = req.body;    // New data for updating the record

    // Find the document by ticker and update it
    const result = await StockAnalysis.findOneAndUpdate({ ticker: ticker }, updateData, { new: true });

    if (!result) {
      return res.status(404).send({ msg: 'Stock Analysis not found with the given ticker' });
    }

    return res.status(200).send({ msg: 'Stock Analysis updated successfully', data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
});

// New route for fetching stock data from Polygon.io
router.get('/stockData/:symbol/:date', async (req, res) => {
  const { symbol, date } = req.params;
  try {
    const response = await axios.get(`https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=${POLYGON_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).send('Error fetching stock data');
  }
});

export default router;

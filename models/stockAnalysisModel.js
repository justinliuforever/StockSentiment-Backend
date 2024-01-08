import mongoose from "mongoose";

const stockAnalysisSchema = mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    homePageURL: {
      type: String,
      required: true,
    },
    logoURL: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    articleURL: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatGPTAnalysis: { // New field added
      shortTermPrediction: {
        type: String,
        required: true,
      },
      longTermPrediction: {
        type: String,
        required: true,
      }
    },
    publishedUTC: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

export const StockAnalysis = mongoose.model("StockAnalysis", stockAnalysisSchema);

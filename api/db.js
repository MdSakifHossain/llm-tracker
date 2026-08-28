import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const mongoClient = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let modelsCollection;

const connectMongo = async () => {
  try {
    await mongoClient.connect();

    db = mongoClient.db("llm-tracker");
    modelsCollection = db.collection("models");

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export { connectMongo, modelsCollection };

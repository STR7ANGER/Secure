
// @ts-nocheck
const mongodb = require("mongodb").MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongodb
    .connect(process.env.MONGO_URI)
    .then((client) => {
      console.log("Connected!!!");
      _db = client.db(); // Store the connected database instance
      callback(client);
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      throw err; // Rethrow the error after logging it
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found!");
  }
  return _db;
};

module.exports = {
  mongoConnect,
  getDb,
};

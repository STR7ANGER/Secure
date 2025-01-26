import express, { Request, Response } from "express";
import mongoose, { Document, Schema } from "mongoose";

const router = express.Router();

// Define an interface for the CSV data
interface ICsvData extends Document {
  document_name: string; // Name of the document
  user_id: string; // ID of the user who uploaded the document
  upload_date: Date; // Date when the document was uploaded
  data: Array<{ [key: string]: any }>; // Array of objects for CSV data
}

// Create a schema for CSV data
const CsvDataSchema: Schema = new Schema({
  document_name: { type: String, required: true },
  user_id: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
  data: { type: [Schema.Types.Mixed], required: true }, // Array of mixed types
});

// Create a model for the CSV data
const CsvDataModel = mongoose.model<ICsvData>("CSVData", CsvDataSchema);

// Route to upload CSV data
router.post(
  "/document/upload-document",
  async (req: Request, res: Response) => {
    console.log("Incoming request body:", req.body); // Log the request body

    // Retrieve document name and data from the request body
    const documentName = req.body.info.document_name; // Adjusted to access the document name correctly
    const data = req.body.data; // Assuming data is passed in the request body

    // Validate required fields
    if (!documentName || !data) {
      return res
        .status(400)
        .json({ success: false, msg: "Document name and data are required" });
    }

    try {
      const dbName = "secure-sight"; // Hardcoded database name
      const user_id = "6704c7e61118b252ff43f13"; // Hardcoded user ID
      const db = mongoose.connection.useDb(dbName);

      const newCsvData = new CsvDataModel({
        document_name: documentName, // Use the document name from the request
        user_id, // Use the hardcoded user ID
        data: data.data, // Assuming data.data is the array of objects you want to save
      });

      await newCsvData.save();
      res.json({ success: true, msg: "CSV data uploaded successfully" });
    } catch (error) {
      console.error("Error uploading CSV data:", error);
      res.status(500).json({ success: false, msg: "Error uploading CSV data" });
    }
  }
);

// Route to fetch all CSV documents
router.get("/document/document-list", async (req: Request, res: Response) => {
  try {
    const dbName = "secure-sight"; // Hardcoded database name
    const db = mongoose.connection.useDb(dbName);

    const documents = await CsvDataModel.find(
      {},
      "document_name upload_date user_id"
    ).sort({ upload_date: -1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    console.error("Error fetching document list:", error);
    res
      .status(500)
      .json({ success: false, msg: "Error fetching document list" });
  }
});

// Route to fetch a specific CSV document by ID
router.get(
  "/document/get-document/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params; // Get the document ID from the route parameters
    try {
      const dbName = "secure-sight"; // Hardcoded database name
      const db = mongoose.connection.useDb(dbName);

      // Find the document by ID
      const document = await CsvDataModel.findById(id);

      if (!document) {
        return res
          .status(404)
          .json({ success: false, msg: "Document not found" });
      }

      res.json({ success: true, data: document }); // Return the found document
    } catch (error) {
      console.error("Error fetching document by ID:", error);
      res.status(500).json({ success: false, msg: "Error fetching document" });
    }
  }
);

export default router;

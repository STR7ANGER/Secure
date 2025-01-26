import ApiServices from "../Network_call/apiservices";
import ApiEndPoints from "../Network_call/ApiEndPoints";

export const uploadCSVDataToDB = async (data, dbName, userId) => {
  try {
    const payload = {
      dbName: dbName,
      user_id: userId,
      csvData: data
    };
    const response = await ApiServices("post", payload, ApiEndPoints.UploadDocument);
    return response;
  } catch (error) {
    console.error("Error uploading CSV data:", error);
    throw error;
  }
};
import mongoose from "mongoose";

// Define the data schema
const connectionDataSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    srcAddress: {
      type: String,
      required: true,
    },
    timeout: {
      type: String,
      required: true,
    },
    protocol: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model based on the schema
const Connection = mongoose.model("EventData", connectionDataSchema);

export default Connection;

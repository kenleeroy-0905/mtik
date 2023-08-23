import mongoose from "mongoose";

const VpnConnectionSchema = new mongoose.Schema(
  {
    callerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    uptime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model based on the schema
const VpnConnection = mongoose.model("EventDataVpn", VpnConnectionSchema);

export default VpnConnection;

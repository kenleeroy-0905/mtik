import express from "express";
import {
  getConnections,
  getConnectionsToday,
  saveConnections,
  getConnectionsYesterday,
  getCountryCounts,
  getDateCounts,
  getAllCountryCounts,
} from "../controllers/connections.js";

const router = express.Router();

router.get("/", getConnections);
router.get("/connectionstoday", getConnectionsToday);
router.get("/connectionsyesterday", getConnectionsYesterday);
router.get("/getcountrystats", getCountryCounts);
router.get("/getallcountrystats", getAllCountryCounts);
router.get("/getdatestats", getDateCounts);
router.post("/saveconnections", saveConnections);

export default router;

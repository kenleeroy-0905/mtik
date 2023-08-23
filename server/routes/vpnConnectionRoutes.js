import express from "express";
import {
  getVpnConenctions,
  getVpnConenctionsToday,
  saveVpnConnections,
  getVpnConnectionsYesterday,
} from "../controllers/vpnConnections.js";

const router = express.Router();

router.get("/vpnconnections", getVpnConenctions);
router.get("/vpnconnectionstoday", getVpnConenctionsToday);
router.get("/vpnconnectionsyesterday", getVpnConnectionsYesterday);
router.post("/savevpnconnections", saveVpnConnections);

export default router;

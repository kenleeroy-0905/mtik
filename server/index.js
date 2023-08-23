import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";

import connectionRoutes from "./routes/connectionRoutes.js";
import vpnConnectionRoutes from "./routes/vpnConnectionRoutes.js";

/* CONFIGURATION */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/connections", connectionRoutes);
app.use("/vpnConnections", vpnConnectionRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

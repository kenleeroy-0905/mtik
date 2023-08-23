import moment from "moment";
import VpnConnection from "../models/VpnConnection.js";

export const getVpnConenctions = async (req, res) => {
  try {
    // Retrieve all documents from the EventData collection
    const eventData = await VpnConnection.find();
    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
};

export const getVpnConenctionsToday = async (req, res) => {
  try {
    // Get the current date and time
    const currentDate = new Date();

    // Set the time to the beginning of the current day
    currentDate.setHours(0, 0, 0, 0);

    // Set the time to the end of the current day
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Query the EventData collection for documents within the specified date range
    const eventData = await VpnConnection.find({
      createdAt: { $gte: currentDate, $lt: nextDay },
    });

    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

export const getVpnConnectionsYesterday = async (req, res) => {
  try {
    // Calculate the start and end of yesterday
    const yesterdayStart = moment().subtract(1, "days").startOf("day");
    const yesterdayEnd = moment().subtract(1, "days").endOf("day");

    // Retrieve documents from the EventData collection created yesterday,
    // and project only the needed fields
    const eventData = await VpnConnection.find({
      createdAt: {
        $gte: yesterdayStart.toDate(),
        $lte: yesterdayEnd.toDate(),
      },
    });

    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
};

export const saveVpnConnections = async (req, res) => {
  const { callerId, name, service, uptime } = req.body.eventDataVpn;
  const eventData = new VpnConnection({
    callerId: callerId || "N/A",
    name: name || "N/A",
    service: service || "N/A",
    uptime: uptime || "N/A",
  });

  try {
    // Create a new document in the EventData collection
    const savedData = await VpnConnection.create(eventData);

    res.sendStatus(200); // Sending a success response
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
};

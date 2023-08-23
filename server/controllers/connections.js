import moment from "moment";
import getCountryIso3 from "country-iso-2-to-3";
import Connection from "../models/Connection.js";

export const getConnections = async (req, res) => {
  try {
    // Retrieve all documents from the EventData collection
    const eventData = await Connection.find();
    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
};

export const getCountryCounts = async (req, res) => {
  try {
    const [topCountryCounts, totalConnections] = await Promise.all([
      Connection.aggregate([
        {
          $group: {
            _id: "$country",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
      ]).exec(),
      Connection.countDocuments(),
    ]);

    res.status(200).json({ topCountryCounts, totalConnections });
  } catch (error) {
    console.error("Error retrieving top country counts:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getAllCountryCounts = async (req, res) => {
  try {
    const countryCounts = await Promise.all([
      Connection.aggregate([
        {
          $group: {
            _id: "$country",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]).exec(),
      Connection.countDocuments(),
    ]);

    res.status(200).json({ countryCounts });
  } catch (error) {
    console.error("Error retrieving top country counts:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getDateCounts = async (req, res) => {
  try {
    const [dateCounts, totalConnections] = await Promise.all([
      Connection.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]).exec(),
      Connection.countDocuments(),
    ]);

    res.status(200).json({ dateCounts, totalConnections });
  } catch (error) {
    console.error("Error retrieving date counts:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
export const getConnectionsToday = async (req, res) => {
  try {
    // Get the current date and time
    const currentDate = new Date();

    // Set the time to the beginning of the current day
    currentDate.setHours(0, 0, 0, 0);

    // Set the time to the end of the current day
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Query the EventData collection for documents within the specified date range
    const eventData = await Connection.find({
      createdAt: { $gte: currentDate, $lt: nextDay },
    });

    res.status(200).json(eventData); // Sending the retrieved data as a JSON response
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
};

export const getConnectionsYesterday = async (req, res) => {
  try {
    // Calculate the start and end of yesterday
    const yesterdayStart = moment().subtract(1, "days").startOf("day");
    const yesterdayEnd = moment().subtract(1, "days").endOf("day");

    // Retrieve documents from the EventData collection created yesterday,
    // and project only the needed fields
    const eventData = await Connection.find({
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

export const saveConnections = async (req, res) => {
  const { country, city, srcAddress, timeout, protocol } = req.body.eventData;
  const eventData = new Connection({
    country: country || "N/A",
    city: city || "N/A",
    srcAddress: srcAddress || "N/A",
    timeout: timeout || "N/A",
    protocol: protocol || "N/A",
  });

  try {
    // Create a new document in the EventData collection
    const savedData = await Connection.create(eventData);

    res.sendStatus(200); // Sending a success response
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Internal Server Error" }); // Sending a more detailed error response
  }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const createEvent = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).send("Internal Server Error!");
      }
      const image = req.file ? req.file.filename : "";

      const {
        name,
        date,
        location,
        organizer,
        description,
        maxCapacity,
        lastRegistrationDate,
      } = req.body;
      if (maxCapacity <= 0) {
        return res
          .status(400)
          .json({ error: "Max capacity must be a positive number" });
      }

      const event = await prisma.event.create({
        data: {
          name,
          date: new Date(date),
          location,
          organizer,
          description,
          maxCapacity: parseInt(maxCapacity),
          image,
          lastRegistrationDate: new Date(lastRegistrationDate),
        },
      });

      console.log("Created Event:", event);
      res.json(event);
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("Internal Server Error!");
  }
};

const updateEvent = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).send("Internal Server Error!");
      }
      const { id } = req.params;
      const {
        name,
        date,
        location,
        organizer,
        description,
        maxCapacity,
        lastRegistrationDate,
      } = req.body;
      const image = req.file ? req.file.filename : "";

      console.log("Request Body:", req.body);

      const updatedEvent = await prisma.event.update({
        where: { id: parseInt(id) },
        data: {
          name,
          date,
          location,
          organizer,
          description,
          image,
          maxCapacity: parseInt(maxCapacity),
          lastRegistrationDate,
        },
      });

      console.log(updatedEvent);
      res.json(updatedEvent);
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send("Internal Server Error");
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedEvent);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getEvents = async (req, res) => {
  try {
    const getAllEvents = await prisma.event.findMany();
    res.json(getAllEvents);
    console.log("Events:", getAllEvents);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        registrations: true,
      },
    });

    if (!event) {
      return res.status(404).json("Event not found");
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
};

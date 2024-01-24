const router = require("express").Router();

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
} = require("../controllers/events");

router.post("/createEvent", createEvent);
router.put("/updateEvent/:id", updateEvent);
router.delete("/deleteEvent/:id", deleteEvent);
router.get("/allEvents", getEvents);
router.get("/eventById/:id", getEventById);
module.exports = router;

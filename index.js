require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

const eventsRouter = require("./routers/events");
const registrationRouter = require("./routers/registration");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/events", eventsRouter);
app.use("/registration", registrationRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

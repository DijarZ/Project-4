const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const transporter = require("./nodemailer");

const createRegistration = async (req, res) => {
  try {
    const { eventId, email, firstName, lastName } = req.body;

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId,
        email,
      },
    });

    if (existingRegistration) {
      return res.status(400).json("Email already registered for this event");
    }

    // Kontrollimi se a egziston eventi per te vazhduar tek kontrollimi i lastRegistrationDate
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json("Event not found");
    }

    // Kontrollimi i dates new Date me daten e fundit te regjistrimit ne tabelen event
    if (new Date() > event.lastRegistrationDate) {
      return res.status(400).json("Registrations for this event have closed.");
    }

    // Kontrollimi kapacitetit per tu regjistruar ne event
    if (event.maxCapacity <= 0) {
      return res
        .status(400)
        .json("Sorry, registrations for this event are full.");
    }
    const registration = await prisma.registration.create({
      data: {
        eventId,
        email,
        firstName,
        lastName,
      },
    });

    console.log("Registration successful:", registration);

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        maxCapacity: {
          decrement: 1,
        },
      },
    });

    console.log("Max capacity decremented for event:", updatedEvent);

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Email Verification",
      html: `Hi ${registration.firstName},Your registration for the ${event.name} event as been successfully completed.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        console.log("Verification email sent:", info.response);
      } else {
        console.error("Error sending verification email:", error);
      }
    });

    res.json(registration);
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json("Internal Server Error!");
  }
};

const registrationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const registrationDetails = await prisma.registration.findUnique({
      where: { id: parseInt(id) },
      include: {
        event: true,
      },
    });
    if (!registrationDetails) {
      return res.status(404).json("Registration not found");
    }
    res.json(registrationDetails);
    console.log(registrationDetails);
  } catch (error) {
    console.error(
      "Error fetching registration details for specific registraion:",
      error
    );
    res.status(500).json("Internal Server Error!");
  }
};
const getAllRegistrations = async (req, res) => {
  try {
    const allRegistrations = await prisma.registration.findMany();
    res.json(allRegistrations);
  } catch (error) {
    console.error("Error fetching all registrations:", error);
    res.status(500).send("Internal Server Error");
  }
};

const registrationUserDetails = async (req, res) => {
  try {
    const { email } = req.body;
    const registrationUserDetails = await prisma.registration.findMany({
      where: { email },
      include: {
        event: true,
      },
    });
    if (!registrationUserDetails) {
      return res.status(404).json("Registration not found");
    }
    res.json(registrationUserDetails);
    console.log(registrationUserDetails);
  } catch (error) {
    console.error(
      "Error fetching registration details for specific participants:",
      error
    );
    res.status(500).json("Internal Server Error!");
  }
};
module.exports = {
  createRegistration,
  registrationDetails,
  getAllRegistrations,
  registrationUserDetails,
};

const router = require("express").Router();

const {
  createRegistration,
  registrationDetails,
  getAllRegistrations,
  registrationUserDetails,
} = require("../controllers/registration");

router.post("/createRegistration", createRegistration);
router.get("/registrationDetails/:id", registrationDetails);
router.get("/getAllRegistrations", getAllRegistrations);
router.get("/participantsDetails", registrationUserDetails);
module.exports = router;

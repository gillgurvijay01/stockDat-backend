var express = require('express')
var bodyParser = require("body-parser");
const cors = require("cors");
var router = express.Router();
var onboardingController = require("./../../controllers/onboarding/v1.0");

router.get("/",(req,res)=> {
    res.status(200).send('API is LIVE')
});

router.post("/login",onboardingController.signIn);
router.post("/signup",onboardingController.signUp);


module.exports = router ;
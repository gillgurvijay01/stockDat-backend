// External dependencies
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser");
const onboardingRoute  = require('./routes/onboarding');
const listingRoute = require("./routes/list")
const  errorHandler = require('./middlewares/errorHandler');
const authHeader = require("./middlewares/authHeader")
const userGetter = require("./middlewares/userGetter")

const app = express();
module.exports = app

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.get('/', (req, res) => res.send('Welcome to the backend!'));
app.use("/api/",onboardingRoute)
app.use("/api/list",authHeader,userGetter,listingRoute)
// Error Middleware
app.use(errorHandler)
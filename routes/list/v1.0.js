var express = require('express')
var bodyParser = require("body-parser");
const cors = require("cors");
var router = express.Router();
var ListController = require("./../../controllers/listing")
router.get("/",ListController.getList);


module.exports = router ;
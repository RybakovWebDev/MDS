const express = require("express");

const { postMessage } = require("../controllers/chatbotController");
const { errorHandler } = require("../helpers/errorHandler");

const router = express.Router();

router.post("/", postMessage, errorHandler);

module.exports = router;

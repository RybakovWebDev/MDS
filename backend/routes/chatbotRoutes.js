const express = require("express");

const { postMessage } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/", postMessage);

module.exports = router;

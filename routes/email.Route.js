

const express = require("express");

const router = express.Router();
const {limiter} = require("../middleware/ratelimiter")

const {contact} = require("../controllers/email.Controller")


router.post("/contact", limiter, contact);

module.exports = router
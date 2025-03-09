const express = require("express");
const { shortenUrl, redirectUrl, getAnalytics } = require("../controllers/urlController");
const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortUrl", redirectUrl);
router.get("/analytics/:shortUrl", getAnalytics);

module.exports = router;

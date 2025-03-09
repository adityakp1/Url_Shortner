const admin = require("firebase-admin"); // 🔥 Import admin
const db = require("../config/firebase"); // Ensure Firestore is properly initialized
const shortid = require("shortid");
const useragent = require("useragent");

// ✅ Shorten a URL
exports.shortenUrl = async (req, res) => {
    try {
        const { longUrl, customAlias, expiryTime, maxClicks } = req.body;
        let shortUrl = customAlias || shortid.generate();

        console.log("Received request to shorten:", longUrl);

        // Check if custom alias already exists
        const existingDoc = await db.collection("urls").doc(shortUrl).get();
        if (existingDoc.exists) {
            console.log("Alias already taken:", shortUrl);
            return res.status(400).json({ message: "Alias already taken" });
        }

        const newUrl = {
            longUrl,
            shortUrl,
            expiryTime: expiryTime ? Date.now() + expiryTime * 1000 : null,
            maxClicks: maxClicks || null,
            clicks: 0,
            analytics: [],
        };

        await db.collection("urls").doc(shortUrl).set(newUrl);
        console.log("Short URL created:", shortUrl);

        const BACKEND = process.env.BACKEND_URL;
        res.json({ shortUrl: `${BACKEND}/${shortUrl}` });
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Redirect and Track Analytics
exports.redirectUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        console.log("Requested Short URL:", shortUrl);

        const doc = await db.collection("urls").doc(shortUrl).get();

        if (!doc.exists) {
            console.log("Document not found in Firestore");
            return res.status(404).json({ message: "Link not found" });
        }

        let urlData = doc.data();

        // Expiration checks
        if (urlData.expiryTime && Date.now() > urlData.expiryTime) {
            console.log("Link expired:", shortUrl);
            return res.status(410).json({ message: "Link expired" });
        }

        if (urlData.maxClicks && urlData.clicks >= urlData.maxClicks) {
            console.log("Max clicks reached for:", shortUrl);
            return res.status(410).json({ message: "Max clicks reached" });
        }

        // Collect analytics
        const agent = useragent.parse(req.headers["user-agent"]);
        const analyticsData = {
            timestamp: Date.now(),
            ip: req.ip || req.headers["x-forwarded-for"] || "Unknown",
            device: agent.device.toString(),
            browser: agent.toAgent(),
        };

        // Update clicks & analytics in Firestore
        await db.collection("urls").doc(shortUrl).update({
            clicks: admin.firestore.FieldValue.increment(1),
            analytics: admin.firestore.FieldValue.arrayUnion(analyticsData),
        });

        console.log("Redirecting to:", urlData.longUrl);
        res.redirect(urlData.longUrl);
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get Analytics Data
exports.getAnalytics = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        console.log("Fetching analytics for:", shortUrl);

        const doc = await db.collection("urls").doc(shortUrl).get();

        if (!doc.exists) {
            console.log("No analytics found for:", shortUrl);
            return res.status(404).json({ message: "Link not found" });
        }

        res.json(doc.data().analytics);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ message: "Server error" });
    }
};

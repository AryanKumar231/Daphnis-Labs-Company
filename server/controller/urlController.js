import UrlShort from "../models/UrlShort.js";
import crypto from "crypto";

// Create short URL
const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ message: "Original URL is required" });
        }

        // Optional: validate URL
        try {
            new URL(originalUrl); // will throw if invalid
        } catch {
            return res.status(400).json({ message: "Invalid URL format" });
        }

        // Generate a unique short code
        let shortCode;
        let exists = true;
        while (exists) {
            shortCode = crypto.randomBytes(4).toString("hex"); // 8 chars
            exists = await UrlShort.findOne({ shortCode });
        }

        const urlShort = new UrlShort({
            originalUrl,
            shortCode,
            user: req.user?.id || null
        });

        await urlShort.save();

        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        res.status(201).json({ shortUrl: `${baseUrl}/${shortCode}` });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Redirect to original URL
const redirectToOriginal = async (req, res) => {
    try {
        const { code } = req.params;
        const urlShort = await UrlShort.findOne({ shortCode: code });

        if (!urlShort) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        urlShort.clicks += 1;
        await urlShort.save();

        res.redirect(urlShort.originalUrl);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get all URLs for a logged-in user
const getUserUrls = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const urls = await UrlShort.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


// Get stats for a given short URL code
const getUrlStats = async (req, res) => {
    try {
        const { code } = req.params;

        const urlData = await UrlShort.findOne({ shortCode: code }).populate('user', 'username email');

        if (!urlData) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        res.status(200).json({
            originalUrl: urlData.originalUrl,
            shortCode: urlData.shortCode,
            createdAt: urlData.createdAt,
            totalClicks: urlData.clicks,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};




export {
    createShortUrl,
    redirectToOriginal,
    getUserUrls,
    getUrlStats
};

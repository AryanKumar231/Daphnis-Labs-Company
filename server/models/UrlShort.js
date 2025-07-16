import mongoose from "mongoose";

const urlShortSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const UrlShort = mongoose.model("UrlShort", urlShortSchema);

export default UrlShort;
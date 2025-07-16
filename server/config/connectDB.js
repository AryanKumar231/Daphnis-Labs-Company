import mongoose from "mongoose"

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected...");
    } catch (err) {
        console.log(err);
    }
}


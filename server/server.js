import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { connectDatabase } from "./config/connectDB.js"
import authroutes from "./routes/authroutes.js"
import urlroutes from "./routes/urlroutes.js"
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

connectDatabase()


app.use("/api/", authroutes)
app.use("/", urlroutes)


app.listen(5000, () => {
    console.log("Port listining...\nserver running...");
})
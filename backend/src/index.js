import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import { connectDB } from "./utils/db.js";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
    connectDB()
})

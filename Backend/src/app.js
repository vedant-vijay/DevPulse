import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import endpointRouter from "./routes/endpoint.router.js"
import orgRouter from "./routes/organization.router.js";
import sseRouter from "./routes/sse.router.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { apiLimiter } from "./middleware/rateLimiter.middleware.js";
import { logger } from "./utils/logger.js";
import pinoHttp from "pino-http";

const app = express();
app.use(pinoHttp({
    logger : logger
}))

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use('/auth/v1', authRouter)

app.use(apiLimiter)

app.use('/api/v1/endpoints', endpointRouter)
app.use('/api/v1/organisations', orgRouter)
app.use("/api/v1/sse", sseRouter)

app.get("/health", (req, res)=>{
    res.json({status:"ok"})
})

app.use(errorHandler)

export default app;
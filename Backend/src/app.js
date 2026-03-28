import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import endpointRouter from "./routes/endpoint.router.js"
import orgRouter from "./routes/organization.router.js";

const app = express();
app.use(cookieParser())

app.use(express.json())
app.use(cors())

app.use('/auth/v1', authRouter)
app.use('/api/v1/endpoints', endpointRouter)
app.use('/api/v1/organisations', orgRouter)

app.get("/health", (req, res)=>{
    res.json({status:"ok"})
})

export default app;
import {sseController} from '../controllers/sse.controller.js'
import express from "express"


const sseRouter = express.Router()

sseRouter.get("/", sseController)

export default sseRouter;

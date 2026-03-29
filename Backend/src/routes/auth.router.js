import express from "express"
import {registerController, loginController, refreshController,  logoutController} from "../controllers/auth.controller.js"
import {authMiddleware} from "../middleware/auth.middlware.js"
import { authLimiter } from "../middleware/rateLimiter.middleware.js"

const authRouter = express.Router()


authRouter.post('/signup', registerController)

authRouter.post('/login', authLimiter, loginController)

authRouter.post('/refresh', refreshController)

authRouter.post('/logout',authMiddleware, logoutController)


export default authRouter


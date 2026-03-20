import express from "express"
import {registerController, loginController, refreshController,  logoutController} from "../controllers/auth.controller.js"
import {authMiddleware} from "../middleware/auth.middlware.js"

const router = express.Router()

router.post('/signup', registerController)

router.post('/login', loginController)

router.post('/refresh', refreshController)

router.post('/logout',authMiddleware, logoutController)


export default router


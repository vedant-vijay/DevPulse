
import {createEndpointController, getEndpointByIdController, getEndpointsByOrgController, updateEndpointController, deleteEndpointController} from "../controllers/endpoint.controller.js"
import express from "express"
import { authMiddleware } from "../middleware/auth.middlware.js"

const endpointRouter = express.Router()
router.use(authMiddleware)

router.post('/', createEndpointController)
router.get('/', getEndpointsByOrgController)
router.get('/:id', getEndpointByIdController)
router.put('/:id', updateEndpointController)
router.delete('/:id', deleteEndpointController)

export default endpointRouter
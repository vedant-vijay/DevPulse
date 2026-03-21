
import {createEndpointController, getEndpointByIdController, getEndpointsByOrgController, updateEndpointController, deleteEndpointController} from "../controllers/endpoint.controller.js"
import express from "express"
import { authMiddleware } from "../middleware/auth.middlware.js"

const endpointRouter = express.Router()
endpointRouter.use(authMiddleware)

endpointRouter.post('/', createEndpointController)
endpointRouter.get('/', getEndpointsByOrgController)
endpointRouter.get('/:id', getEndpointByIdController)
endpointRouter.put('/:id', updateEndpointController)
endpointRouter.delete('/:id', deleteEndpointController)

export default endpointRouter
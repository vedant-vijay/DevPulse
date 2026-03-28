
import {createEndpointController, getEndpointByIdController, getEndpointsByOrgController, updateEndpointController, deleteEndpointController} from "../controllers/endpoint.controller.js"
import express from "express"
import { authMiddleware } from "../middleware/auth.middlware.js"
import { requireRole  } from "../middleware/rbac.middleware.js"
const endpointRouter = express.Router()
endpointRouter.use(authMiddleware)

endpointRouter.post('/',requireRole(['owner', 'editor']), createEndpointController)
endpointRouter.get('/',requireRole(['owner', 'editor', 'member']), getEndpointsByOrgController)
endpointRouter.get('/:id',requireRole(['owner', 'editor', 'member']), getEndpointByIdController)
endpointRouter.put('/:id',requireRole(['owner', 'editor']), updateEndpointController)
endpointRouter.delete('/:id',requireRole(['owner']), deleteEndpointController)

export default endpointRouter
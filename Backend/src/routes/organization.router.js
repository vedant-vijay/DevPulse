import {createOrgController, getOrgByIdController, getOrgByUserIdController, updateOrgController, deleteOrgController} from '../controllers/organization.controller.js'
import express from 'express'
import { authMiddleware } from '../middleware/auth.middlware.js'

const orgRouter = express.Router()
orgRouter.use(authMiddleware)

orgRouter.post('/', createOrgController)
orgRouter.get('/', getOrgByUserIdController)
orgRouter.get('/:id', getOrgByIdController)
orgRouter.put('/:id', updateOrgController)
orgRouter.delete('/:id', deleteOrgController)

export default orgRouter;
import {createOrgController, getOrgByIdController, getOrgByUserIdController, updateOrgController, deleteOrgController} from '../controllers/organization.controller.js'
import express from 'express'
import { authMiddleware } from '../middleware/auth.middlware.js'
import { requireRole } from '../middleware/rbac.middleware.js'

const orgRouter = express.Router()
orgRouter.use(authMiddleware)

orgRouter.post('/', createOrgController)
orgRouter.get('/',requireRole(['owner', 'editor', 'member']), getOrgByUserIdController)
orgRouter.get('/:id',requireRole(['owner', 'editor', 'member']), getOrgByIdController)
orgRouter.put('/:id',requireRole(['owner', 'editor']), updateOrgController)
orgRouter.delete('/:id',requireRole(['owner']), deleteOrgController)

export default orgRouter;

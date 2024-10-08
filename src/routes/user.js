import Router from 'express'
import { getUsersList, getUserList, postUserList, patchUserList, delUserList } from '../controllers/user.js'
import { authenticateToken, authorizeRole } from '../middlewares/auth.js'

export const router = Router()

router.get('/user', authenticateToken, authorizeRole('user'), getUsersList)

router.get('/user/:id', getUserList)

router.post('/user', postUserList)

router.patch('/user/:id', patchUserList)

router.delete('/user/:id', delUserList)

export default router

import { getUsersList, getUserList, postUserList, patchUserList, delUserList } from '../controllers/user.js'

import Router from 'express'

export const router = Router()

router.get('/user', getUsersList)

router.get('/user/:id', getUserList)

router.post('/user', postUserList)

router.patch('/user/:id', patchUserList)

router.delete('/user/:id', delUserList)

export default router

import { getsUserList, getUserList } from '../controllers/user.js'

import Router from 'express'

export const router = Router()


router.get('/user', getsUserList)

router.get('/user/:id', getUserList)

// router.post('/user', postUserList)

// router.patch('/user/:id', patUserList)

// router.delete('/user/:id', delUserList)

export default router

import Router from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'

export const router = Router()

router.post('/signup', registerUser)
router.post('/signin', loginUser)

export default router
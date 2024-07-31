import Router from 'express'

export const router = Router()

router.post('/signup', registerUser)
router.post('/signin', loginUser)

export default router
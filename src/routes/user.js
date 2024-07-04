// import user from '../services/user.json' assert { type: "json"}

import getUserList from '../controllers/user.js'

import Router from 'express'

export const router = Router()


router.get('/user', getUserList)

router.post('/user', (req, res) => {

})

router.put('/user', (req, res) => {

})

router.delete('/user', (req, res) => {

})

export default router

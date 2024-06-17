import { Router } from 'express'

const router = Router()

router.get('/user', (req, res) => {
    const data = {
        "title": "Hi !!!",
        "website": ""
    }
    res.json(data)
})

router.post('/user', (req, res) => {

})

router.put('/user', (req, res) => {

})

router.delete('/user', (req, res) => {

})

export default router

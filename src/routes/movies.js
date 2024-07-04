import movies from '../data/movies.json' assert { type: "json"}

import Router from 'express'

export const router = Router()

router.get('/movies', (req, res) => {
    res.send(movies)
})

router.post('/movies', (req, res) => {

    const id = movies.length + 1
    const { title, rating } = req.body

    if (title && rating) {
        const newMovie = { ...req.body, id }
        movies.push(newMovie)
        console.log(newMovie)
        res.json('saved')
    } else {
        res.send('WRONG RESQUEST')
    }

})

router.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    movies.forEach((movie, i) => {
        if (movie.id === id) {
            movies.splice(i, 1)
        }
    })
    res.send(movies)
})

export default router


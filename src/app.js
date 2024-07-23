import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'

import routerUser from './routes/user.js'
import routerMovies from './routes/movies.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use(routerUser)
app.use(routerMovies)


const PORT = process.env.port || 3000

app.listen(PORT, () => { console.log(`Server is running in port ${PORT}`) })

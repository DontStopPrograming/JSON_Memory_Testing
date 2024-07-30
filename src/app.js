import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

import errorHandler from './middlewares/errorrHandler.js'

import routerUser from './routes/user.js'
import routerMovies from './routes/movies.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(compression())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(limiter)

app.use('/api', routerUser)
app.use(routerMovies)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`Server is running in port ${PORT}`) })

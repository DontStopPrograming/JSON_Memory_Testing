import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'

import routerUser from './routes/user.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50
})

app.use(limiter)

app.use('/api', routerUser)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })

    .catch(err => {
        console.error('Database connection error:',)
    })



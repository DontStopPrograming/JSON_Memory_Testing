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


const port = process.env.port || 3000

app.listen(port, () => { console.log(`Server is running in port ${port}`) })

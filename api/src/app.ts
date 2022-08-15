import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Routes from './routes'
import { deserialize } from './middleware/deserialize.session'
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())
app.use(deserialize)

const server = app.listen(9100, () => {
  console.log('Server is up and running http://localhost:9100')
  Routes(app)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED SERVER ERROR', err)
  server.close(process.exit(1))
})

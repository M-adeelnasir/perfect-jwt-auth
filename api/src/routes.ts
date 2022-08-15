import { Express } from 'express'
import { createSessionHandler } from './contollers/user.session'

export default function (app: Express) {
  app.post('/api/session', createSessionHandler)
}

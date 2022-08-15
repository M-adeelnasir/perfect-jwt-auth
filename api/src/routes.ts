import { Express } from 'express'
import {
  createSessionHandler,
  getSeessionHanlder,
} from './contollers/user.session'

export default function (app: Express) {
  //login
  app.post('/api/session', createSessionHandler)
  //get session
  app.get('/api/session', getSeessionHanlder)
}

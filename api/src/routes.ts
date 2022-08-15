import { Express } from 'express'
import {
  createSessionHandler,
  getSeessionHanlder,
  deleteSession,
} from './contollers/user.session'

export default function (app: Express) {
  //login
  app.post('/api/session', createSessionHandler)
  //get session
  app.get('/api/session', getSeessionHanlder)
  //delete session
  app.delete('/api/session', deleteSession)
}

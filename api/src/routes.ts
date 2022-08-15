import { Express } from 'express'
import {
  createSessionHandler,
  getSeessionHanlder,
  deleteSession,
} from './contollers/user.session'
import { requireSignIn } from './middleware/requireSignIg'

export default function (app: Express) {
  //login
  app.post('/api/session', createSessionHandler)
  //get session
  app.get('/api/session', requireSignIn, getSeessionHanlder)
  //delete session
  app.delete('/api/session', requireSignIn, deleteSession)
}

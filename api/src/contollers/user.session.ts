import { Request, Response } from 'express'
import { getUser } from '../../db'

//handle login
export async function createSessionHandler(req: Request, res: Response) {
  //check for the password
  const { email, password } = req.body
  const user = getUser(email)
  if (user && user.password !== password) {
    return res.status(401).send('invalid email or password')
  }
}

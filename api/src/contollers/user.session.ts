import { Request, Response } from 'express'
import { createSession, getUser } from '../db'
import { jwtSign, verifyToken } from '../jwt.utils'

//handle login
export async function createSessionHandler(req: Request, res: Response) {
  //check for the password

  const { email, password } = req.body

  const user = getUser(email)

  //@ts-ignore
  const session = createSession(email, user?.name)

  if (user && user.password !== password) {
    return res.status(401).send('invalid email or password')
  }
  //create access token
  const accessToken = jwtSign(
    { email, password, sessionId: session.sessionId },
    '5s'
  )

  //create refresh token
  const refreshToken = jwtSign(
    { email, password, sessionId: session.sessionId },
    '1y'
  )

  //set the access token in cookie
  res.cookie('accessToken', accessToken, {
    maxAge: 300000, //5min
    httpOnly: true,
  })
  //set the refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.15e10, //1 year
    httpOnly: true,
  })

  //decode the user and send to client
  res.status(200).send({ ...session })
}

export function getSeessionHanlder(req: Request, res: Response) {
  //@ts-ignore
  const user = req.user
  console.log(user)

  res.send(user)
}

export function deleteSession(req: Request, res: Response) {
  //@ts-ignore
  res.cookie('accessToken', '', {
    maxAge: 0,
    httpOnly: true,
  })
  res.send({ success: true })
}

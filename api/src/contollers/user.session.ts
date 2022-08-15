import { Request, Response } from 'express'
import { getUser } from '../db'
import { jwtSign, verifyToken } from '../jwt.utils'

//handle login
export async function createSessionHandler(req: Request, res: Response) {
  //check for the password

  const { email, password } = req.body
  console.log(email, password)

  const user = getUser(email)
  if (user && user.password !== password) {
    return res.status(401).send('invalid email or password')
  }
  //create access token
  const accessToken = jwtSign({ email, password }, '1h')

  //set the token in cookie
  res.cookie('accessToken', accessToken, {
    maxAge: 300000, //5min
    httpOnly: true,
  })

  const { expired, decoded, valid } = await verifyToken(accessToken)

  //decode the user and send to client
  res.status(200).send({ user: user?.email, name: user?.name, accessToken })
}

import { Response, Request, NextFunction } from 'express'
import { jwtSign, verifyToken } from '../jwt.utils'

export async function deserialize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken, refreshToken } = req.cookies

  if (!accessToken) return next()

  //valid token
  const { decoded, expired } = await verifyToken(accessToken)
  if (decoded) {
    //@ts-ignore
    req.user = decoded

    return next()
  }

  next()
}

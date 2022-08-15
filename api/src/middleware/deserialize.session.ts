import { Response, Request, NextFunction } from 'express'
import { verifyToken } from '../jwt.utils'

export async function deserialize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken } = req.cookies

  if (!accessToken) return next()

  const { decoded } = await verifyToken(accessToken)
  console.log('This', decoded)

  if (decoded) {
    //@ts-ignore
    req.user = decoded

    return next()
  }
  next()
}

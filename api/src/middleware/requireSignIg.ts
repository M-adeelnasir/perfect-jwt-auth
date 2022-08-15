import { Response, Request, NextFunction } from 'express'

export async function requireSignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //@ts-ignore
  if (!req.user) {
    return res.status(403).send('Inavlid User Session')
  }
  return next()
}

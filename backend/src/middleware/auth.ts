import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'

export interface AuthenticatedRequest extends Request {
  userId?: string
  user?: any
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError('Token não fornecido', 401)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.userId = (decoded as any).userId
    req.user = decoded

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Token inválido', 401)
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expirado', 401)
    }
    throw error
  }
}

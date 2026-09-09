import { Request, Response, NextFunction } from 'express'

interface ApiError extends Error {
  statusCode?: number
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Erro interno do servidor'

  console.error(`[${statusCode}] ${message}`, err)

  res.status(statusCode).json({
    error: {
      statusCode,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}

export class AppError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

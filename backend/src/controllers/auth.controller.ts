import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { AppError } from '../middleware/errorHandler'

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    throw new AppError('Email, senha e nome são obrigatórios', 400)
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new AppError('Usuário já existe', 409)
  }

  const user = new User({ email, password, name })
  await user.save()

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

  res.status(201).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new AppError('Email e senha são obrigatórios', 400)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }

  const passwordMatch = await user.comparePassword(password)
  if (!passwordMatch) {
    throw new AppError('Senha incorreta', 401)
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

  res.json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  })
}

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body
  if (!token) {
    throw new AppError('Token não fornecido', 400)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const newToken = jwt.sign({ userId: (decoded as any).userId }, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    })

    res.json({ token: newToken })
  } catch (error) {
    throw new AppError('Token inválido', 401)
  }
}

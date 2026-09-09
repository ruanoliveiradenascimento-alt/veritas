import { Response } from 'express'
import { User } from '../models/User'
import { AuthenticatedRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.userId).select('-password')
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }

  res.json(user)
}

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { name, avatar, preferences } = req.body
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, avatar, preferences },
    { new: true }
  ).select('-password')

  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }

  res.json(user)
}

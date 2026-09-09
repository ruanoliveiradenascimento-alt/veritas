import { Request, Response } from 'express'
import { Discipline } from '../models/Discipline'
import { AuthenticatedRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getDisciplines = async (req: Request, res: Response) => {
  const disciplines = await Discipline.find().populate('instructor', 'name').populate('lessons')
  res.json(disciplines)
}

export const getDisciplineById = async (req: Request, res: Response) => {
  const { id } = req.params
  const discipline = await Discipline.findById(id).populate('instructor').populate('lessons').populate('students')

  if (!discipline) {
    throw new AppError('Disciplina não encontrada', 404)
  }

  res.json(discipline)
}

export const createDiscipline = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, icon, color } = req.body

  const discipline = new Discipline({
    title,
    description,
    icon,
    color,
    instructor: req.userId,
  })

  await discipline.save()
  res.status(201).json(discipline)
}

export const updateDiscipline = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const { title, description, icon, color } = req.body

  const discipline = await Discipline.findByIdAndUpdate(
    id,
    { title, description, icon, color },
    { new: true }
  )

  if (!discipline) {
    throw new AppError('Disciplina não encontrada', 404)
  }

  res.json(discipline)
}

export const deleteDiscipline = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const discipline = await Discipline.findByIdAndDelete(id)

  if (!discipline) {
    throw new AppError('Disciplina não encontrada', 404)
  }

  res.json({ message: 'Disciplina deletada com sucesso' })
}

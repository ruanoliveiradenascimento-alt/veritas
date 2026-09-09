import { Request, Response } from 'express'
import { Lesson } from '../models/Lesson'
import { AuthenticatedRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getLessonsByDiscipline = async (req: Request, res: Response) => {
  const { disciplineId } = req.params
  const lessons = await Lesson.find({ disciplineId }).sort('order')
  res.json(lessons)
}

export const getLessonById = async (req: Request, res: Response) => {
  const { id } = req.params
  const lesson = await Lesson.findById(id).populate('quiz')

  if (!lesson) {
    throw new AppError('Lição não encontrada', 404)
  }

  res.json(lesson)
}

export const createLesson = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, disciplineId, order, content, videoUrl, resources } = req.body

  const lesson = new Lesson({
    title,
    description,
    disciplineId,
    order,
    content,
    videoUrl,
    resources,
  })

  await lesson.save()
  res.status(201).json(lesson)
}

export const updateLesson = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const { title, description, content, videoUrl, resources } = req.body

  const lesson = await Lesson.findByIdAndUpdate(
    id,
    { title, description, content, videoUrl, resources },
    { new: true }
  )

  if (!lesson) {
    throw new AppError('Lição não encontrada', 404)
  }

  res.json(lesson)
}

export const deleteLesson = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const lesson = await Lesson.findByIdAndDelete(id)

  if (!lesson) {
    throw new AppError('Lição não encontrada', 404)
  }

  res.json({ message: 'Lição deletada com sucesso' })
}

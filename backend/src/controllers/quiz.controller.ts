import { Request, Response } from 'express'
import { Quiz } from '../models/Quiz'
import { AuthenticatedRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getQuizzesByDiscipline = async (req: Request, res: Response) => {
  const { disciplineId } = req.params
  const quizzes = await Quiz.find({ disciplineId })
  res.json(quizzes)
}

export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params
  const quiz = await Quiz.findById(id)

  if (!quiz) {
    throw new AppError('Quiz não encontrado', 404)
  }

  res.json(quiz)
}

export const createQuiz = async (req: AuthenticatedRequest, res: Response) => {
  const { title, disciplineId, questions } = req.body

  const quiz = new Quiz({
    title,
    disciplineId,
    questions,
  })

  await quiz.save()
  res.status(201).json(quiz)
}

export const submitQuiz = async (req: AuthenticatedRequest, res: Response) => {
  const { quizId, answers } = req.body

  const quiz = await Quiz.findById(quizId)
  if (!quiz) {
    throw new AppError('Quiz não encontrado', 404)
  }

  let correctCount = 0
  const results = quiz.questions.map((question, index) => {
    const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(answers[index])
    if (isCorrect) correctCount++

    return {
      questionIndex: index,
      isCorrect,
      explanation: question.explanation,
    }
  })

  const score = (correctCount / quiz.questions.length) * 100

  res.json({
    score,
    correctCount,
    totalQuestions: quiz.questions.length,
    results,
  })
}

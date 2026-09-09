import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getQuizzesByDiscipline,
  getQuizById,
  submitQuiz,
  createQuiz,
} from '../controllers/quiz.controller'

const router = Router()

router.get('/discipline/:disciplineId', getQuizzesByDiscipline)
router.get('/:id', getQuizById)
router.post('/submit', authenticate, submitQuiz)
router.post('/', authenticate, createQuiz)

export default router

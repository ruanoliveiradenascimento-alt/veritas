import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getLessonsByDiscipline,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lesson.controller'

const router = Router()

router.get('/discipline/:disciplineId', getLessonsByDiscipline)
router.get('/:id', getLessonById)
router.post('/', authenticate, createLesson)
router.put('/:id', authenticate, updateLesson)
router.delete('/:id', authenticate, deleteLesson)

export default router

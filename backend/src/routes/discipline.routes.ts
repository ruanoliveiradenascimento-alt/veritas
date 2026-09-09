import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import {
  getDisciplines,
  getDisciplineById,
  createDiscipline,
  updateDiscipline,
  deleteDiscipline,
} from '../controllers/discipline.controller'

const router = Router()

router.get('/', getDisciplines)
router.get('/:id', getDisciplineById)
router.post('/', authenticate, createDiscipline)
router.put('/:id', authenticate, updateDiscipline)
router.delete('/:id', authenticate, deleteDiscipline)

export default router

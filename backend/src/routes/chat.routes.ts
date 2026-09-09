import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { sendMessage, getChatHistory } from '../controllers/chat.controller'

const router = Router()

router.post('/send', authenticate, sendMessage)
router.get('/history/:sessionId', authenticate, getChatHistory)

export default router

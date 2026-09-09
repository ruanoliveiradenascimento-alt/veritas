import { Response } from 'express'
import { ChatMessage } from '../models/ChatMessage'
import { AuthenticatedRequest } from '../middleware/auth'
import { createChatCompletion } from '../config/ai'
import { AppError } from '../middleware/errorHandler'

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  const { content, sessionId, context } = req.body

  if (!content || !sessionId) {
    throw new AppError('Conteúdo e sessionId são obrigatórios', 400)
  }

  // Save user message
  const userMessage = new ChatMessage({
    userId: req.userId,
    sessionId,
    role: 'user',
    content,
    context,
  })
  await userMessage.save()

  // Get chat history for context
  const history = await ChatMessage.find({ sessionId }).sort('timestamp').limit(10)

  // Format messages for OpenAI
  const messages = history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }))

  // Get IA response
  let aiResponse: string
  try {
    aiResponse = (await createChatCompletion(messages)) || 'Desculpe, não consegui processar sua mensagem'
  } catch (error) {
    console.error('Erro ao chamar IA:', error)
    aiResponse = 'Desculpe, houve um erro ao processar sua mensagem. Tente novamente mais tarde.'
  }

  // Save AI message
  const assistantMessage = new ChatMessage({
    userId: req.userId,
    sessionId,
    role: 'assistant',
    content: aiResponse,
    context,
  })
  await assistantMessage.save()

  res.json({
    userMessage,
    assistantMessage,
  })
}

export const getChatHistory = async (req: AuthenticatedRequest, res: Response) => {
  const { sessionId } = req.params
  const messages = await ChatMessage.find({ sessionId, userId: req.userId }).sort('timestamp')

  res.json(messages)
}

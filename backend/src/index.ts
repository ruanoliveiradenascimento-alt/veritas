import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import dotenv from 'dotenv'

import { connectDatabase } from './config/database'
import { initializeRedis } from './config/redis'
import { errorHandler } from './middleware/errorHandler'

// Routes
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import disciplineRoutes from './routes/discipline.routes'
import lessonRoutes from './routes/lesson.routes'
import chatRoutes from './routes/chat.routes'
import quizRoutes from './routes/quiz.routes'

// Load environment variables
dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Veritas Backend is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/disciplines', disciplineRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/quizzes', quizRoutes)

// Socket.io events for real-time chat
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('join-chat', (data) => {
    socket.join(`chat-${data.userId}`)
  })

  socket.on('send-message', (data) => {
    io.to(`chat-${data.userId}`).emit('receive-message', data)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

// Error handler (must be last)
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// Initialize
const start = async () => {
  try {
    await connectDatabase()
    await initializeRedis()

    const PORT = process.env.PORT || 5000
    httpServer.listen(PORT, () => {
      console.log(`🚀 Veritas Backend rodando em http://localhost:${PORT}`)
      console.log(`📡 WebSocket disponível em ws://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error)
    process.exit(1)
  }
}

start()

export { io }

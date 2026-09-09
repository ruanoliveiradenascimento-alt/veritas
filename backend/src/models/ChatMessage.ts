import mongoose, { Schema, Document } from 'mongoose'

export interface IChatMessage extends Document {
  userId: mongoose.Types.ObjectId
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  context?: {
    disciplineId?: mongoose.Types.ObjectId
    lessonId?: mongoose.Types.ObjectId
  }
  timestamp: Date
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    context: {
      disciplineId: Schema.Types.ObjectId,
      lessonId: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
)

// Índice para buscar rápido por usuário e sessão
chatMessageSchema.index({ userId: 1, sessionId: 1, timestamp: 1 })

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema)

import mongoose, { Schema, Document } from 'mongoose'

export interface IQuestion {
  _id?: mongoose.Types.ObjectId
  type: 'multiple' | 'essay'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

export interface IQuiz extends Document {
  title: string
  disciplineId: mongoose.Types.ObjectId
  questions: IQuestion[]
  createdAt: Date
}

const quizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: true,
    },
    disciplineId: {
      type: Schema.Types.ObjectId,
      ref: 'Discipline',
      required: true,
    },
    questions: [
      {
        type: {
          type: String,
          enum: ['multiple', 'essay'],
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        options: [String],
        correctAnswer: {
          type: Schema.Types.Mixed,
          required: true,
        },
        explanation: String,
      },
    ],
  },
  { timestamps: true }
)

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema)

import mongoose, { Schema, Document } from 'mongoose'

export interface ILesson extends Document {
  title: string
  description: string
  disciplineId: mongoose.Types.ObjectId
  order: number
  content: string
  videoUrl?: string
  resources?: { name: string; url: string }[]
  quiz?: mongoose.Types.ObjectId
  createdAt: Date
}

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    disciplineId: {
      type: Schema.Types.ObjectId,
      ref: 'Discipline',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    videoUrl: String,
    resources: [
      {
        name: String,
        url: String,
      },
    ],
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  },
  { timestamps: true }
)

export const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema)

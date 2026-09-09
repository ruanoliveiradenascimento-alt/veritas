import mongoose, { Schema, Document } from 'mongoose'

export interface IDiscipline extends Document {
  title: string
  description: string
  icon: string
  color: string
  instructor: mongoose.Types.ObjectId
  lessons: mongoose.Types.ObjectId[]
  students: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const disciplineSchema = new Schema<IDiscipline>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: String,
    color: String,
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

export const Discipline = mongoose.model<IDiscipline>('Discipline', disciplineSchema)

export interface JWTPayload {
  userId: string
  iat: number
  exp: number
}

export interface ChatContext {
  disciplineId?: string
  lessonId?: string
}

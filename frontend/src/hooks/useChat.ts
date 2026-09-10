'use client'

import { useState, useCallback } from 'react'
import api from '@/lib/api'
import { useChatStore } from '@/lib/stores/chat'

export const useChat = (sessionId: string) => {
  const { messages, addMessage, setLoading } = useChatStore()
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string, context?: any) => {
      try {
        setLoading(true)
        setError(null)

        const response = await api.post('/chat/send', {
          content,
          sessionId,
          context,
        })

        addMessage({
          id: response.data.userMessage._id,
          role: 'user',
          content: response.data.userMessage.content,
          timestamp: new Date(response.data.userMessage.timestamp),
        })

        addMessage({
          id: response.data.assistantMessage._id,
          role: 'assistant',
          content: response.data.assistantMessage.content,
          timestamp: new Date(response.data.assistantMessage.timestamp),
        })
      } catch (err: any) {
        setError('Erro ao enviar mensagem')
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [sessionId, addMessage, setLoading]
  )

  const getHistory = useCallback(async () => {
    try {
      const response = await api.get(`/chat/history/${sessionId}`)
      return response.data
    } catch (err) {
      setError('Erro ao buscar histórico')
      throw err
    }
  }, [sessionId])

  return { messages, error, sendMessage, getHistory }
}

'use client'

import { useState, useCallback } from 'react'
import api from '@/lib/api'

interface Discipline {
  _id: string
  title: string
  description: string
  icon: string
  color: string
  students?: number
}

export const useDisciplines = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get('/disciplines')
      setDisciplines(response.data)
    } catch (err: any) {
      setError('Erro ao buscar disciplinas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getDisciplineById = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/disciplines/${id}`)
      return response.data
    } catch (err: any) {
      setError('Erro ao buscar disciplina')
      throw err
    }
  }, [])

  return { disciplines, loading, error, fetch, getDisciplineById }
}

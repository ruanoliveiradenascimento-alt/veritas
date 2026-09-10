'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/auth'

export const useAuth = () => {
  const { user, token, setToken, logout, init } = useAuthStore()

  useEffect(() => {
    init()
  }, [])

  return {
    user,
    token,
    isAuthenticated: !!token,
    setToken,
    logout,
  }
}

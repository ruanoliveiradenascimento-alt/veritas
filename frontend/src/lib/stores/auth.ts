'use client'

import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'student' | 'teacher' | 'admin'
  plan: 'free' | 'pro' | 'premium'
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
  init: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
  init: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      set({ token, isLoading: false })
    }
  },
}))

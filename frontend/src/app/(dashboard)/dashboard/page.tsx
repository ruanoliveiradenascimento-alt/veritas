'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Zap, BarChart3, LogOut } from 'lucide-react'
import api from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await api.get('/users/profile')
        setUser(response.data)
      } catch (error) {
        console.error('Erro ao buscar perfil:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="w-16 h-16 bg-primary-600/20 rounded-full mx-auto"></div>
          <p className="text-gray-400">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="border-b border-primary-600/20 bg-dark/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold neon-glow">Dashboard</h1>
            <p className="text-gray-400">Bem-vindo, {user?.name}</p>
          </div>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            <LogOut size={18} className="mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Card: Disciplinas */}
          <div className="neon-border rounded-lg p-6 bg-gradient-to-br from-primary-900/30 to-transparent hover:from-primary-900/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Disciplinas</h3>
              <BookOpen size={32} className="text-primary-400" />
            </div>
            <p className="text-3xl font-bold text-primary-400 mb-2">8</p>
            <p className="text-gray-400">Continue estudando</p>
            <Link href="/dashboard/disciplinas">
              <Button className="w-full mt-4 bg-primary-600 hover:bg-primary-700">
                Ver Disciplinas
              </Button>
            </Link>
          </div>

          {/* Card: Progresso */}
          <div className="neon-border rounded-lg p-6 bg-gradient-to-br from-primary-900/30 to-transparent hover:from-primary-900/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Progresso</h3>
              <BarChart3 size={32} className="text-primary-400" />
            </div>
            <p className="text-3xl font-bold text-primary-400 mb-2">65%</p>
            <p className="text-gray-400">Continuar evoluindo</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Card: Chat IA */}
          <div className="neon-border rounded-lg p-6 bg-gradient-to-br from-primary-900/30 to-transparent hover:from-primary-900/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Tutor IA</h3>
              <Zap size={32} className="text-primary-400" />
            </div>
            <p className="text-3xl font-bold text-primary-400 mb-2">Roberto</p>
            <p className="text-gray-400">Chat 24/7 disponível</p>
            <Link href="/dashboard/chat">
              <Button className="w-full mt-4 bg-primary-600 hover:bg-primary-700">
                Conversar
              </Button>
            </Link>
          </div>
        </div>

        {/* Disciplinas em Andamento */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Continuando de onde parou</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="neon-border rounded-lg p-6 bg-gradient-to-br from-primary-900/20 to-transparent hover:from-primary-900/40 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Gestão Ambiental</h3>
                    <p className="text-gray-400">Unidade 3 - EIA e RIMA</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">68%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

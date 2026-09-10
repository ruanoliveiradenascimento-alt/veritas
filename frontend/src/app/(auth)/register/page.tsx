'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'
import { Mail, Lock, User, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não correspondem')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      toast.success('Conta criada com sucesso! Redirecionando...')
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    } catch (err: any) {
      const message = err.response?.data?.error?.message || 'Erro ao registrar'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold neon-glow">Veritas</h1>
          <p className="text-gray-300">Crie sua conta de estudante</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle size={20} className="text-red-500" />
              <span className="text-red-400">{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nome</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-primary-400" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="João Silva"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-primary-400" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-primary-400" />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-400">Mínimo 6 caracteres</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Confirme a Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-primary-400" />
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3"
          >
            {loading ? 'Criando conta...' : 'Registrar'}
          </Button>
        </form>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark text-gray-400">ou</span>
            </div>
          </div>

          <Link href="/auth/login">
            <Button variant="outline" className="w-full border-primary-600 text-primary-400">
              Já tem conta? Entre
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400">
          Ao registrar, você concorda com nossos{' '}
          <Link href="/terms" className="text-primary-400 hover:text-primary-300">
            Termos de Serviço
          </Link>
          {' e '}
          <Link href="/privacy" className="text-primary-400 hover:text-primary-300">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}

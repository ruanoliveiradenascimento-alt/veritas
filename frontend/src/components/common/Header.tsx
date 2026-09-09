'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-primary-600/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center font-bold text-lg group-hover:shadow-lg group-hover:shadow-primary-600/50 transition-all">
              V
            </div>
            <span className="font-bold text-xl neon-glow hidden sm:inline">Veritas</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-300 hover:text-primary-400 transition">
              Disciplinas
            </Link>
            <Link href="#" className="text-gray-300 hover:text-primary-400 transition">
              Sobre
            </Link>
            <Link href="#" className="text-gray-300 hover:text-primary-400 transition">
              Planos
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Entrar</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    Registrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="#" className="block text-gray-300 hover:text-primary-400">
              Disciplinas
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-primary-400">
              Sobre
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-primary-400">
              Planos
            </Link>
            <div className="space-y-2 pt-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                      Dashboard
                    </Button>
                  </Link>
                  <Button className="w-full" variant="outline" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block">
                    <Button className="w-full" variant="outline">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth/register" className="block">
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                      Registrar
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

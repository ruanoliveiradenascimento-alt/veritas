'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/common/Header'
import { ArrowRight, BookOpen, Zap, Users } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-radial from-primary-600/20 to-transparent"></div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight neon-glow">
                  Coneximento que acompanha você.
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Cadernos completos, videoaulas objetivas, simulados e assistência inteligente para transformar sua rotina de estudos.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/auth/register">
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                      Começar Agora <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline" className="border-primary-600 text-primary-400 hover:bg-primary-600/10 px-8 py-3 rounded-lg text-lg font-semibold">
                      Já tenho conta
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-400">8+</p>
                    <p className="text-sm text-gray-400">Disciplinas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-400">24h</p>
                    <p className="text-sm text-gray-400">Disponível</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-400">100%</p>
                    <p className="text-sm text-gray-400">Satisfação</p>
                  </div>
                </div>
              </div>
              <div className="relative animate-slide-in">
                <div className="neon-border rounded-lg p-8 bg-gradient-to-br from-primary-900/50 to-transparent">
                  <div className="aspect-square bg-gradient-radial from-primary-600/30 to-transparent rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <BookOpen size={64} className="mx-auto text-primary-400" />
                      <p className="text-xl font-semibold text-gray-300">Seu Assistente de Estudos</p>
                      <p className="text-sm text-gray-400">IA Inteligente 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-primary-900/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Por que escolher Veritas?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Conteúdo Estruturado',
                  description: 'Cadernos completos e bem organizados para cada disciplina'
                },
                {
                  icon: Zap,
                  title: 'Tutor IA Inteligente',
                  description: 'Roberto está disponível 24/7 para ajudar suas dúvidas'
                },
                {
                  icon: Users,
                  title: 'Comunidade Ativa',
                  description: 'Conecte-se com outros estudantes e aprenda juntos'
                }
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} className="neon-border rounded-lg p-8 bg-gradient-to-br from-primary-900/30 to-transparent hover:from-primary-900/50 transition-all">
                    <Icon size={40} className="text-primary-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Pronto para começar sua jornada?</h2>
            <p className="text-lg text-gray-300 mb-8">Junte-se a milhares de estudantes que já estão transformando seu aprendizado.</p>
            <Link href="/auth/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg text-lg font-semibold">
                Registre-se Gratuitamente
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

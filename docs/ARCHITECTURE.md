# 🏗️ Arquitetura do Veritas

## Visão Geral

O Veritas é uma plataforma full-stack construída com tecnologias modernas e escaláveis.

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENTE (Frontend)                      │
│  Next.js 14 | React | TypeScript | Tailwind CSS            │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    REST API + WebSocket
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE API (Backend)                   │
│       Node.js | Express | TypeScript | Socket.io           │
├─────────────────────────────────────────────────────────────┤
│  • Autenticação JWT                                          │
│  • Rotas RESTful                                             │
│  • Chat em tempo real (Socket.io)                            │
│  • Integração com IA (OpenAI/Claude)                         │
└─────────────────────────────────────────────────────────────┘
                            ↕
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐   ┌──────────────┐
│  MongoDB     │    │    Redis     │   │  OpenAI API  │
│  (Dados)     │    │   (Cache)    │   │   (IA)       │
└──────────────┘    └──────────────┘   └──────────────┘
```

## 📚 Camadas da Aplicação

### 1. Frontend (Next.js)

```
frontend/
├── app/                          # App Router
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Home
│   ├── (auth)/                  # Group de autenticação
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/             # Group protegido
│   │   ├── layout.tsx
│   │   ├── dashboard/           # Home do dashboard
│   │   ├── disciplinas/         # Listagem de disciplinas
│   │   ├── disciplinas/[id]/    # Detalhes da disciplina
│   │   ├── meu-espaco/          # Dados do usuário
│   │   ├── planos/              # Gerenciamento de planos
│   │   └── chat/                # Chat com IA
│   └── api/                     # Route handlers
│       └── auth/                # Autenticação
├── components/
│   ├── common/                  # Componentes globais
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── dashboard/               # Componentes do dashboard
│   │   ├── ProgressCard.tsx
│   │   ├── DisciplineCard.tsx
│   │   └── AITutor.tsx
│   └── ui/                      # Componentes Shadcn/ui
├── hooks/                       # Custom hooks
│   ├── useAuth.ts
│   ├── useDisciplines.ts
│   └── useChat.ts
├── lib/                         # Utilitários
│   ├── api.ts                   # Cliente HTTP
│   ├── auth.ts                  # Autenticação
│   └── constants.ts
├── styles/                      # CSS global
├── .env.local                   # Variáveis de ambiente
└── package.json
```

### 2. Backend (Node.js/Express)

```
backend/
├── src/
│   ├── index.ts                 # Ponto de entrada
│   ├── config/                  # Configurações
│   │   ├── database.ts          # Conexão MongoDB
│   │   ├── redis.ts             # Conexão Redis
│   │   └── ai.ts                # Configuração IA
│   ├── middleware/              # Middlewares
│   │   ├── auth.ts              # JWT middleware
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   ├── routes/                  # Rotas
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── disciplines.routes.ts
│   │   ├── lessons.routes.ts
│   │   ├── quizzes.routes.ts
│   │   ├── chat.routes.ts
│   │   └── admin.routes.ts
│   ├── controllers/             # Controllers
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── disciplines.controller.ts
│   │   ├── lessons.controller.ts
│   │   ├── quizzes.controller.ts
│   │   └── chat.controller.ts
│   ├── models/                  # Modelos Mongoose
│   │   ├── User.ts
│   │   ├── Discipline.ts
│   │   ├── Lesson.ts
│   │   ├── Quiz.ts
│   │   ├── UserProgress.ts
│   │   └── ChatMessage.ts
│   ├── services/                # Serviços
│   │   ├── auth.service.ts      # Lógica de autenticação
│   │   ├── user.service.ts
│   │   ├── ai.service.ts        # Integração IA
│   │   ├── email.service.ts     # Envio de emails
│   │   └── quiz.service.ts
│   ├── utils/                   # Utilitários
│   │   ├── jwt.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   └── types/                   # Interfaces TypeScript
│       └── index.ts
├── .env                         # Variáveis de ambiente
├── Dockerfile
└── package.json
```

## 🔐 Fluxo de Autenticação

```
1. Usuário faz login
   ↓
2. Backend valida credenciais
   ↓
3. Backend gera JWT Token
   ↓
4. Frontend armazena token (localStorage/cookies)
   ↓
5. Requisições incluem: Authorization: Bearer <token>
   ↓
6. Backend valida token via middleware
   ↓
7. Acesso concedido ao recurso
```

## 💬 Chat em Tempo Real (Socket.io)

```
Frontend → Socket.io → Backend → IA Service → Resposta
                              ↓
                        Salva em MongoDB
                        + Cache em Redis
```

## 📊 Estrutura de Dados

### User
```typescript
{
  _id: ObjectId
  email: string (unique)
  password: string (hashed)
  name: string
  avatar: string
  role: 'student' | 'teacher' | 'admin'
  plan: 'free' | 'pro' | 'premium'
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}
```

### Discipline
```typescript
{
  _id: ObjectId
  title: string
  description: string
  icon: string
  color: string
  instructor: ObjectId (ref: User)
  lessons: [ObjectId] (ref: Lesson)
  students: [ObjectId] (ref: User)
  createdAt: Date
}
```

### Lesson
```typescript
{
  _id: ObjectId
  title: string
  description: string
  disciplineId: ObjectId (ref: Discipline)
  order: number
  content: string (Markdown)
  videoUrl: string
  resources: [{ name, url }]
  quiz: ObjectId (ref: Quiz)
  createdAt: Date
}
```

### Quiz
```typescript
{
  _id: ObjectId
  title: string
  disciplineId: ObjectId
  questions: [
    {
      _id: ObjectId
      type: 'multiple' | 'essay'
      question: string
      options: string[]
      correctAnswer: string | number
      explanation: string
    }
  ]
  createdAt: Date
}
```

### ChatMessage
```typescript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  context: {
    disciplineId: ObjectId
    lessonId: ObjectId
  }
  timestamp: Date
}
```

## 🤖 Integração com IA

### Fluxo do Chat com Roberto (Tutor IA)

```
1. Usuário envia mensagem
2. Backend recebe e valida
3. Obtém contexto (disciplina, lições completadas)
4. Envia para OpenAI/Claude com system prompt
5. IA responde considerando:
   - Nível do usuário
   - Conteúdo da aula
   - Histórico de chat
6. Resposta armazenada e retornada
7. Frontend exibe em tempo real
```

### System Prompt do Roberto
```
Você é Roberto, um tutor IA especializado em ajudar estudantes.
Você é amigável, paciente e didático.
Adapte suas explicações ao nível do aluno.
Sempre cite fontes quando apropriado.
Ofereça exercícios práticos quando possível.
```

## 🔄 Fluxos Principais

### Fluxo: Usuário aprende uma lição
```
1. Usuário acessa disciplina
2. Sistema carrega lições em ordem
3. Usuário visualiza conteúdo + vídeo
4. Sistema marca como visualizado
5. Usuário pode fazer quiz
6. IA fornece feedback
7. Progresso é atualizado
```

### Fluxo: Usuário faz simulado
```
1. Usuário inicia simulado
2. Sistema seleciona questões (algoritmo adaptativo)
3. Usuário responde cada questão
4. Sistema valida resposta
5. IA fornece explicação
6. Ao final, gera relatório completo
7. Identifica pontos fracos
8. Sugere materiais para revisar
```

### Fluxo: Usuário conversa com IA
```
1. Usuário abre chat com Roberto
2. Envia pergunta
3. Backend valida e enriquece contexto
4. Chama API OpenAI/Claude
5. Recebe resposta estruturada
6. Armazena na coleção ChatMessage
7. Envia para frontend via Socket.io
8. Frontend exibe com formatação
```

## 🚀 Deploy

### Desenvolvimento
```bash
docker-compose up
```

### Produção
- Frontend: Vercel / AWS S3 + CloudFront
- Backend: Railway / Render / AWS EC2
- Banco de Dados: MongoDB Atlas
- Cache: Redis Cloud
- IA: OpenAI API / Claude API

## 📱 Responsividade

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## ⚡ Performance

- Frontend: Next.js Image Optimization
- Backend: Redis caching
- Banco: Índices MongoDB otimizados
- CDN: CloudFront para assets estáticos

## 🔒 Segurança

- ✅ HTTPS obrigatório
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL/NoSQL Injection prevention
- ✅ XSS Protection
- ✅ CSRF tokens
- ✅ Senhas com bcrypt
- ✅ JWT com expiração

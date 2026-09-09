# 📋 Padrões de Código - Veritas

## Estrutura de Pastas

### Backend

```
src/
├── index.ts              # Ponto de entrada
├── config/               # Configurações
│   ├── database.ts
│   ├── redis.ts
│   └── ai.ts
├── middleware/           # Middlewares
│   ├── auth.ts
│   └── errorHandler.ts
├── routes/               # Rotas
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   └── ...
├── controllers/          # Controllers
│   ├── auth.controller.ts
│   └── ...
├── models/               # Modelos Mongoose
│   ├── User.ts
│   └── ...
├── services/             # Serviços de negócio
│   ├── auth.service.ts
│   ├── ai.service.ts
│   └── ...
├── utils/                # Utilitários
├── types/                # Interfaces TypeScript
└── dist/                 # Build compilado
```

### Frontend

```
src/
├── app/                  # App Router (Next.js 14)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
├── components/
│   ├── common/           # Componentes globais
│   ├── dashboard/        # Componentes do dashboard
│   └── ui/               # Componentes UI (Shadcn)
├── hooks/                # Custom hooks
├── lib/                  # Utilitários
│   ├── api.ts           # Cliente HTTP
│   ├── auth.ts          # Autenticação
│   └── utils.ts
├── styles/               # CSS global
└── public/               # Assets estáticos
```

## TypeScript

### Tipos e Interfaces

```typescript
// ✅ BOM: Interfaces bem definidas
export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher' | 'admin'
}

// ✅ BOM: Tipos genéricos
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// ❌ EVITAR: Any type
const data: any = response.data  // Ruim!

// ✅ BOM: Type-safe
const data: User = response.data
```

### Enums

```typescript
// ✅ BOM: Usar enums para valores constantes
enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

// ✅ BOM: Validação em tipos
type Plan = 'free' | 'pro' | 'premium'
```

## Backend - Node.js/Express

### Controllers

```typescript
// ✅ BOM: Controller bem estruturado
export const getDisciplines = async (req: Request, res: Response) => {
  try {
    const disciplines = await Discipline.find()
      .populate('instructor')
      .populate('lessons')
    
    res.json(disciplines)
  } catch (error) {
    // Erro tratado pelo middleware
    throw new AppError('Erro ao buscar disciplinas', 500)
  }
}
```

### Models Mongoose

```typescript
// ✅ BOM: Model com interface e métodos
export interface IUser extends Document {
  email: string
  password: string
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// ✅ BOM: Métodos no modelo
userSchema.methods.comparePassword = async function(password: string) {
  return await bcryptjs.compare(password, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema)
```

### Middleware

```typescript
// ✅ BOM: Middleware typado
export interface AuthRequest extends Request {
  userId?: string
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new AppError('Token não fornecido', 401)
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.userId = (decoded as any).userId
    next()
  } catch (error) {
    throw new AppError('Token inválido', 401)
  }
}
```

### Tratamento de Erros

```typescript
// ✅ BOM: Classe de erro customizada
export class AppError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message)
  }
}

// ✅ BOM: Lançar erro tipado
if (!user) {
  throw new AppError('Usuário não encontrado', 404)
}
```

## Frontend - React/Next.js

### Componentes

```typescript
// ✅ BOM: Componente bem estruturado
'use client'

import { FC, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface CardProps {
  title: string
  children: ReactNode
  onAction?: () => void
}

const Card: FC<CardProps> = ({ title, children, onAction }) => {
  return (
    <div className="rounded-lg border border-primary-600 p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
      {onAction && (
        <Button onClick={onAction}>Ação</Button>
      )}
    </div>
  )
}

export default Card
```

### Custom Hooks

```typescript
// ✅ BOM: Hook customizado
'use client'

import { useState, useCallback } from 'react'
import api from '@/lib/api'

export const useDisciplines = () => {
  const [disciplines, setDisciplines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get('/disciplines')
      setDisciplines(response.data)
    } catch (err) {
      setError('Erro ao buscar disciplinas')
    } finally {
      setLoading(false)
    }
  }, [])

  return { disciplines, loading, error, fetch }
}
```

### API Calls

```typescript
// ✅ BOM: Cliente HTTP com interceptores
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// ✅ BOM: Interceptador de requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ✅ BOM: Interceptador de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)
```

## CSS/Tailwind

### Nomes de Classes

```jsx
// ✅ BOM: Classes bem organizadas
<div className="flex items-center justify-between gap-4 p-6 rounded-lg border border-primary-600 bg-gradient-to-r from-primary-900 to-transparent">
  
// ✅ BOM: Usar cn() para classes condicionais
import { cn } from '@/lib/utils'

<button className={cn(
  'px-4 py-2 rounded-lg',
  isActive ? 'bg-primary-600' : 'bg-gray-700'
)}>

// ❌ EVITAR: Strings concatenadas
const buttonClass = 'px-4 py-2 ' + (isActive ? 'bg-primary-600' : '')
```

## Commits Git

### Convenção Commits

```bash
# ✅ BOM
feat: Add chat with AI tutor
fix: Resolve login token issue
docs: Update API documentation
style: Format code with prettier
refactor: Reorganize folder structure
test: Add unit tests for auth
chore: Update dependencies

# ❌ EVITAR
fixed bug
update
changes
```

## Variáveis de Ambiente

```bash
# ✅ BOM: Nomes descritivos
NEXT_PUBLIC_API_URL=http://localhost:5000
JWT_SECRET=chave_super_secreta_longa
OPENAI_API_KEY=sk-...

# ❌ EVITAR: Nomes vagos
API_URL=...
SECRET=...
```

## Documentação

### JSDoc

```typescript
/**
 * Faz login do usuário
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns Token JWT
 * @throws AppError se credenciais inválidas
 */
export const login = async (email: string, password: string): Promise<string> => {
  // ...
}
```

## Performance

### Frontend

```typescript
// ✅ BOM: Memoizar componentes
import { memo } from 'react'

const Card = memo(({ title, content }: Props) => (
  <div>{title}</div>
))

// ✅ BOM: useCallback para funções
const handleClick = useCallback(() => {
  // ...
}, [dependency])

// ✅ BOM: Lazy load componentes
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Carregando...</div>,
})
```

### Backend

```typescript
// ✅ BOM: Usar índices no MongoDB
userSchema.index({ email: 1 })
chatMessageSchema.index({ userId: 1, timestamp: -1 })

// ✅ BOM: Cache com Redis
const cached = await redisClient.get(`discipline:${id}`)
if (cached) return JSON.parse(cached)
```

## Segurança

```typescript
// ✅ BOM: Senhas com bcrypt
const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(password, salt)

// ✅ BOM: JWT com expiração
jwt.sign(payload, secret, { expiresIn: '7d' })

// ✅ BOM: Validação de entrada
const { error, value } = schema.validate(req.body)
if (error) throw new AppError(error.message, 400)

// ✅ BOM: CORS configurado
cors({ origin: process.env.FRONTEND_URL })
```

## Testes

```typescript
// ✅ BOM: Teste bem estruturado
describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const req = { body: { email, password, name } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    
    await register(req, res)
    
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalled()
  })
})
```

---

**Mantenha esses padrões em mente ao contribuir com o projeto!** ✨

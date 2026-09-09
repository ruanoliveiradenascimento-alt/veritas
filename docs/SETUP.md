# 🚀 Guia de Setup - Veritas

## Pré-requisitos

Antes de começar, certifique-se que você tem instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Docker** e **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git**

## ⚡ Setup Rápido com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/ruanoliveiradenascimento-alt/veritas.git
cd veritas
```

### 2. Configure as variáveis de ambiente

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env.local
```

### 3. Preencha as chaves necessárias

**backend/.env:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://root:password@mongodb:27017/veritas?authSource=admin
REDIS_URL=redis://redis:6379
JWT_SECRET=sua_chave_secreta_bem_longa_aqui
OPENAI_API_KEY=sua_chave_openai_aqui
FRONTEND_URL=http://localhost:3000
```

### 4. Inicie com Docker Compose

```bash
# Inicia todos os serviços
docker-compose up

# Ou em background
docker-compose up -d
```

✅ Pronto! A plataforma estará rodando:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

---

## 📦 Setup Manual (Desenvolvimento Local)

### 1. Clone o repositório

```bash
git clone https://github.com/ruanoliveiradenascimento-alt/veritas.git
cd veritas
```

### 2. Instale MongoDB e Redis localmente

**No macOS (com Homebrew):**
```bash
brew install mongodb-community redis
brew services start mongodb-community
brew services start redis
```

**No Windows:**
- Baixe e instale [MongoDB](https://www.mongodb.com/try/download/community)
- Baixe e instale [Redis](https://github.com/microsoftarchive/redis/releases)

**No Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb redis-server
sudo systemctl start mongodb
sudo systemctl start redis-server
```

### 3. Setup Backend

```bash
cd backend

# Copie e configure o .env
cp .env.example .env

# Instale dependências
npm install

# Inicie o servidor
npm run dev
```

Você deve ver:
```
🚀 Veritas Backend rodando em http://localhost:5000
🔌 WebSocket disponível em ws://localhost:5000
✅ Conectado ao MongoDB
✅ Conectado ao Redis
```

### 4. Setup Frontend (novo terminal)

```bash
cd frontend

# Copie e configure o .env.local
cp .env.example .env.local

# Instale dependências
npm install

# Inicie o servidor
npm run dev
```

Você deve ver:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

---

## 🔧 Configurações Importantes

### Backend Environment Variables

| Variável | Descrição | Exemplo |
|----------|-----------|----------|
| `NODE_ENV` | Ambiente | `development` \| `production` |
| `PORT` | Porta do servidor | `5000` |
| `MONGODB_URI` | URL de conexão MongoDB | `mongodb://user:pass@host/db` |
| `REDIS_URL` | URL de conexão Redis | `redis://localhost:6379` |
| `JWT_SECRET` | Chave secreta JWT | Gere uma chave aleatória longa |
| `JWT_EXPIRES_IN` | Expiração do token | `7d` |
| `OPENAI_API_KEY` | Chave da OpenAI | Obtenha em [platform.openai.com](https://platform.openai.com) |
| `OPENAI_MODEL` | Modelo a usar | `gpt-4` \| `gpt-3.5-turbo` |
| `FRONTEND_URL` | URL do frontend | `http://localhost:3000` |

### Frontend Environment Variables

| Variável | Descrição | Exemplo |
|----------|-----------|----------|
| `NEXT_PUBLIC_API_URL` | URL da API Backend | `http://localhost:5000` |
| `NEXT_PUBLIC_APP_NAME` | Nome da app | `Veritas` |
| `NEXTAUTH_URL` | URL para NextAuth | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Chave secreta NextAuth | Gere uma chave aleatória |

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to MongoDB"

```bash
# Verifique se MongoDB está rodando
mongosh

# Se não estiver, inicie o serviço
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### Erro: "Redis connection refused"

```bash
# Verifique se Redis está rodando
redis-cli ping
# Deve retornar: PONG

# Se não estiver, inicie o serviço
sudo systemctl start redis-server  # Linux
brew services start redis  # macOS
```

### Erro: "Port 3000 already in use"

```bash
# Mate o processo
lsof -i :3000  # Encontra o PID
kill -9 <PID>  # Mata o processo

# Ou use uma porta diferente
PORT=3001 npm run dev
```

### Erro: "OPENAI_API_KEY not found"

1. Crie uma conta em [platform.openai.com](https://platform.openai.com)
2. Gere uma API key
3. Adicione ao seu `.env`:
   ```env
   OPENAI_API_KEY=sk-your_key_here
   ```

---

## 📊 Verificando se tudo está funcionando

### 1. Teste o Backend

```bash
curl http://localhost:5000/health
```

Você deve receber:
```json
{"status":"ok","message":"Veritas Backend is running"}
```

### 2. Teste o Frontend

Abra http://localhost:3000 no navegador

### 3. Teste a Autenticação

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@veritas.com",
    "password": "senha123",
    "name": "Teste"
  }'
```

---

## 🚢 Deploy

### Deploy do Frontend (Vercel)

```bash
# 1. Pushé seu código para GitHub
git push origin main

# 2. Vá para vercel.com e conecte seu repositório
# 3. Configure as variáveis de ambiente
# 4. Deploy automático!
```

### Deploy do Backend (Railway/Render)

```bash
# 1. Conecte seu repositório
# 2. Configure as variáveis de ambiente
# 3. Deploy automático!
```

### Deploy com Docker

```bash
# Build das imagens
docker-compose build

# Push para registry
docker tag veritas-frontend:latest seu-registry/veritas-frontend
docker push seu-registry/veritas-frontend
```

---

## 📚 Próximos Passos

- [ ] Criar primeira disciplina
- [ ] Adicionar conteúdo de aulas
- [ ] Testar chat com IA
- [ ] Configurar autenticação social
- [ ] Adicionar simulados
- [ ] Implementar análise de progresso

---

## ❓ Dúvidas?

Veja a documentação completa em [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

# 📖 Guia de API - Veritas

## Base URL

```
http://localhost:5000/api
```

## Autenticação

Todas as requisições autenticadas devem incluir:

```
Authorization: Bearer <token>
```

---

## 🔐 Autenticação

### Registro

**POST** `/auth/register`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "João Silva"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "usuario@exemplo.com",
    "name": "João Silva"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

**POST** `/auth/login`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "usuario@exemplo.com",
    "name": "João Silva"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Refresh Token

**POST** `/auth/refresh`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👤 Usuários

### Obter Perfil

**GET** `/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "usuario@exemplo.com",
  "name": "João Silva",
  "avatar": "https://...",
  "role": "student",
  "plan": "free",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "createdAt": "2024-09-09T15:43:08Z",
  "updatedAt": "2024-09-09T15:43:08Z"
}
```

### Atualizar Perfil

**PUT** `/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "João Silva",
  "avatar": "https://...",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

**Response (200):** Usuário atualizado

---

## 📚 Disciplinas

### Listar Disciplinas

**GET** `/disciplines`

**Query Parameters:**
```
?search=&limit=10&page=1
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Gestão Ambiental",
    "description": "Conceitos de gestão ambiental...",
    "icon": "leaf",
    "color": "#10b981",
    "instructor": { "_id": "...", "name": "Prof. João" },
    "lessons": [...],
    "students": [...]
  }
]
```

### Obter Disciplina

**GET** `/disciplines/:id`

**Response (200):** Disciplina completa com lições

### Criar Disciplina

**POST** `/disciplines`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Gestão Ambiental",
  "description": "Conceitos de gestão ambiental...",
  "icon": "leaf",
  "color": "#10b981"
}
```

**Response (201):** Disciplina criada

### Atualizar Disciplina

**PUT** `/disciplines/:id`

**Headers:**
```
Authorization: Bearer <token>
```

### Deletar Disciplina

**DELETE** `/disciplines/:id`

**Headers:**
```
Authorization: Bearer <token>
```

---

## 📖 Lições

### Listar Lições por Disciplina

**GET** `/lessons/discipline/:disciplineId`

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Introdução à Gestão Ambiental",
    "description": "Conceitos básicos...",
    "order": 1,
    "content": "# Conceitos\n\nA gestão ambiental...",
    "videoUrl": "https://youtube.com/...",
    "resources": [
      { "name": "PDF", "url": "https://..." }
    ],
    "quiz": "507f1f77bcf86cd799439012"
  }
]
```

### Obter Lição

**GET** `/lessons/:id`

### Criar Lição

**POST** `/lessons`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Introdução à Gestão Ambiental",
  "description": "Conceitos básicos...",
  "disciplineId": "507f1f77bcf86cd799439011",
  "order": 1,
  "content": "# Conceitos\n\nA gestão ambiental...",
  "videoUrl": "https://youtube.com/...",
  "resources": []
}
```

---

## 💬 Chat com IA

### Enviar Mensagem

**POST** `/chat/send`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "content": "Como funciona a gestão ambiental?",
  "sessionId": "session-123",
  "context": {
    "disciplineId": "507f1f77bcf86cd799439011",
    "lessonId": "507f1f77bcf86cd799439012"
  }
}
```

**Response (200):**
```json
{
  "userMessage": {
    "_id": "507f1f77bcf86cd799439013",
    "role": "user",
    "content": "Como funciona a gestão ambiental?",
    "timestamp": "2024-09-09T15:43:08Z"
  },
  "assistantMessage": {
    "_id": "507f1f77bcf86cd799439014",
    "role": "assistant",
    "content": "A gestão ambiental é um conjunto de práticas...",
    "timestamp": "2024-09-09T15:43:09Z"
  }
}
```

### Obter Histórico de Chat

**GET** `/chat/history/:sessionId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):** Array de mensagens ordenadas por timestamp

---

## ❓ Quizzes

### Listar Quizzes por Disciplina

**GET** `/quizzes/discipline/:disciplineId`

### Obter Quiz

**GET** `/quizzes/:id`

### Criar Quiz

**POST** `/quizzes`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Quiz - Gestão Ambiental",
  "disciplineId": "507f1f77bcf86cd799439011",
  "questions": [
    {
      "type": "multiple",
      "question": "O que é gestão ambiental?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "A resposta correta é A porque..."
    }
  ]
}
```

### Submeter Quiz

**POST** `/quizzes/submit`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "quizId": "507f1f77bcf86cd799439011",
  "answers": [0, 2, 1, 0]
}
```

**Response (200):**
```json
{
  "score": 75,
  "correctCount": 3,
  "totalQuestions": 4,
  "results": [
    {
      "questionIndex": 0,
      "isCorrect": true,
      "explanation": "Explicação da questão 1"
    }
  ]
}
```

---

## ⚠️ Códigos de Erro

| Código | Mensagem | Descrição |
|--------|----------|----------|
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Token não fornecido ou inválido |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Email já existe |
| 500 | Internal Server Error | Erro no servidor |

---

## 🧪 Testar com cURL

### Registrar

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@veritas.com",
    "password": "senha123",
    "name": "Teste"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@veritas.com",
    "password": "senha123"
  }'
```

### Obter Perfil (com token)

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:5000/api/users/profile
```

---

## 📝 Postman Collection

Importe a coleção Postman em `docs/postman-collection.json` para testar todos os endpoints facilmente.

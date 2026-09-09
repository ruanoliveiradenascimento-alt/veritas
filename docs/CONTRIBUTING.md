# 🤝 Guia de Contribuição - Veritas

## Como Contribuir

Obrigado por considerar contribuir com o Veritas! Este documento fornece orientações e instruções para contribuir.

## 📋 Códigos de Conduta

- Seja respeitoso com todos os contribuidores
- Evite comentários ofensivos ou discriminatórios
- Trabalhe colaborativamente para resolver problemas
- Dê crédito aos contribuidores pelas suas ideias

## 🔧 Começando

### 1. Fork o Repositório

```bash
git clone https://github.com/seu-usuario/veritas.git
cd veritas
git remote add upstream https://github.com/ruanoliveiradenascimento-alt/veritas.git
```

### 2. Crie uma Branch

```bash
git checkout -b feature/sua-funcionalidade
# ou
git checkout -b fix/seu-bugfix
```

### 3. Faça suas Mudanças

- Mantenha os padrões de código (ver [CODE_STANDARDS.md](CODE_STANDARDS.md))
- Escreva commits descritivos
- Adicione testes se aplicável
- Atualize documentação

### 4. Commit suas Mudanças

```bash
git add .
git commit -m "feat: Sua descrição clara aqui"
```

**Tipos de Commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Reorganização de código
- `test:` - Testes
- `chore:` - Manutenção

### 5. Push e Pull Request

```bash
git push origin feature/sua-funcionalidade
```

Vá ao GitHub e abra um Pull Request com:
- Título descritivo
- Descrição clara do que foi mudado
- Referência a issues relacionadas (#123)
- Screenshots se aplicável

## 📝 Template de Pull Request

```markdown
## Descrição
Descreva as mudanças feitas

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Atualização de documentação

## Relacionado com Issue
Closes #123

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Sem erros de linting
- [ ] Mudanças testadas localmente
```

## 🐛 Reportando Bugs

Antes de criar um bug report, verifique a lista de issues.

### Template para Bug Report

```markdown
## Descrição
Descrição clara e concisa do bug

## Passos para Reproduzir
1. Vá para...
2. Clique em...
3. O erro ocorre

## Comportamento Esperado
O que deveria acontecer

## Comportamento Atual
O que está acontecendo

## Screenshots
Se aplicável

## Ambiente
- SO: [Windows/Mac/Linux]
- Navegador: [Chrome/Firefox/Safari]
- Node.js: [versão]

## Contexto Adicional
Qualquer outra informação relevante
```

## 💡 Sugerindo Enhancements

### Template para Feature Request

```markdown
## Descrição
Descrição clara da funcionalidade desejada

## Caso de Uso
Por que essa funcionalidade seria útil?

## Solução Proposta
Como você imagina que funcionaria?

## Alternativas
Outras soluções possíveis
```

## 📚 Desenvolvimento Local

### Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Rodar em Desenvolvimento

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Rodar Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Linting

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## 📖 Padrões do Projeto

- Ver [CODE_STANDARDS.md](CODE_STANDARDS.md) para padrões de código
- Ver [ARCHITECTURE.md](ARCHITECTURE.md) para arquitetura
- Ver [API.md](API.md) para documentação de API

## 🔄 Sincronizar Fork

```bash
git fetch upstream
git rebase upstream/main
```

## ❓ Dúvidas?

- Abra uma issue com a tag `question`
- Verifique a documentação existente
- Entre em contato com os mantenedores

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob o MIT License.

---

**Obrigado por contribuir com Veritas! 🚀**

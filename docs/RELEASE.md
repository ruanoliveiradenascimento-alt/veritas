# 📦 Versionamento e Release - Veritas

## Versionamento Semântico

Usamos [Semantic Versioning](https://semver.org/):

- **MAJOR**: Mudanças incompatíveis (1.0.0)
- **MINOR**: Novas funcionalidades compatíveis (1.1.0)
- **PATCH**: Correções de bugs (1.0.1)

## Processo de Release

### 1. Preparação

```bash
# Certifique-se de estar na main
git checkout main
git pull origin main

# Crie branch de release
git checkout -b release/v1.1.0
```

### 2. Atualize Versão

Atualize o arquivo `version.json`:

```json
{
  "version": "1.1.0",
  "releaseDate": "2026-09-09",
  "changelog": "..."
}
```

Atualize `package.json` em backend e frontend:

```json
{
  "version": "1.1.0"
}
```

### 3. Changelog

Atualize `CHANGELOG.md`:

```markdown
## [1.1.0] - 2026-09-09

### Added
- Nova funcionalidade X
- Nova funcionalidade Y

### Fixed
- Corrigido bug X
- Corrigido bug Y

### Changed
- Mudança X
```

### 4. Commit e Tag

```bash
git add .
git commit -m "chore: Release v1.1.0"
git push origin release/v1.1.0
```

Crie Pull Request para revisão.

Após merge:

```bash
git checkout main
git pull origin main
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0
```

### 5. GitHub Release

1. Vá para GitHub Releases
2. Clique em "New Release"
3. Selecione a tag v1.1.0
4. Preencha com o changelog
5. Publique

## Changelog

```markdown
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-09

### Added
- Chat com IA integrado
- Dashboard com progresso
- Sistema de quizzes

### Fixed
- Erro ao fazer login
- Erro ao carregar disciplinas

### Changed
- Melhorado UX do login

## [1.0.0] - 2026-09-01

### Added
- Autenticação básica
- Listagem de disciplinas
- Lições com conteúdo
```

## Hotfix

Para correções urgentes em produção:

```bash
# Crie branch do main
git checkout main
git checkout -b hotfix/v1.0.1

# Faça as correções
# Commit
git add .
git commit -m "fix: Corrigir bug crítico"

# Merge para main e develop
git checkout main
git merge --no-ff hotfix/v1.0.1
git tag v1.0.1

# Delete branch
git branch -d hotfix/v1.0.1
```

## Deploy

### Staging

```bash
git push origin develop
# Deploy automático do GitHub Actions
```

### Production

```bash
git push origin main
# Deploy automático do GitHub Actions
```

---

**Mantenha o versionamento consistente!** 📦

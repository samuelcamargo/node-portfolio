# API de Autenticação - Node Portfolio

Backend em Node.js do meu portfólio, desenvolvido com TypeScript seguindo princípios SOLID e Clean Architecture.

## 🏗️ Arquitetura

O projeto segue os princípios da Clean Architecture e SOLID, organizado em camadas:

```
src/
├── application/           # Casos de uso da aplicação
│   ├── dtos/             # Data Transfer Objects
│   ├── interfaces/       # Interfaces dos casos de uso
│   └── useCases/        # Implementação dos casos de uso
│
├── domain/               # Regras de negócio e entidades
│   ├── entities/        # Entidades do domínio
│   ├── interfaces/      # Interfaces do domínio
│   └── repositories/    # Interfaces dos repositórios
│
├── infra/               # Implementações de infraestrutura
│   ├── database/        # Configurações e implementações do banco
│   │   └── repositories/  # Implementações dos repositórios
│   ├── http/           # Implementações HTTP
│   │   ├── controllers/  # Controllers
│   │   ├── middlewares/ # Middlewares
│   │   └── routes/     # Rotas
│   └── providers/      # Provedores externos (Hash, Token, etc)
│
├── shared/             # Código compartilhado
│   ├── container/      # Configuração de injeção de dependência
│   ├── errors/        # Tratamento de erros
│   └── utils/         # Utilitários
│
└── main/              # Ponto de entrada da aplicação
    └── server.ts
```

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- MongoDB
- JWT (JSON Web Token)
- Swagger
- Jest
- ESLint
- TSyringe (Injeção de Dependência)

## 🔐 Funcionalidades

- Autenticação de usuários com JWT
- Injeção de Dependência com TSyringe
- Tratamento de Erros Centralizado
- Documentação Swagger
- Validações de dados
- Criptografia de senha com bcrypt
- Middleware de Autenticação
- Rotas Protegidas
- Dashboard com estatísticas de habilidades e certificados
  - Visualização por categoria e nível
  - Gráfico radar para análise de competências
  - Timeline de certificações
  - Resumo consolidado de dados

## 📝 Documentação

A documentação da API está disponível através do Swagger UI em:
`http://localhost:3000/api-docs`

## 🚦 Rotas

### Autenticação
- `POST /auth` - Autenticação de usuário
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "string", "expire_in": "number" }`

### Usuários
- `POST /users` - Criar novo usuário
- `GET /users` - Listar usuários (protegido)
- `GET /users/profile` - Obter perfil (protegido)
- `PUT /users/:id` - Atualizar usuário (protegido)
- `DELETE /users/:id` - Remover usuário (protegido)

### Dashboard (Todos protegidos por JWT)
- `GET /dashboard/skills/by-category` - Habilidades agrupadas por categoria
  - Response: `{ "categories": ["Frontend", "Backend", ...], "counts": [8, 10, ...] }`
- `GET /dashboard/skills/by-level` - Habilidades agrupadas por nível
  - Response: `{ "levels": ["Básico", "Intermediário", "Avançado"], "counts": [10, 12, 8] }`
- `GET /dashboard/skills/radar-data` - Dados para gráfico radar de habilidades
  - Response: `{ "categories": [...], "basicCounts": [...], "intermediateCounts": [...], "advancedCounts": [...] }`
- `GET /dashboard/certificates/by-category` - Certificados agrupados por categoria
  - Response: `{ "categories": ["Web Development", "Cloud", ...], "counts": [12, 5, ...] }`
- `GET /dashboard/certificates/by-platform` - Certificados agrupados por plataforma
  - Response: `{ "platforms": ["Udemy", "Coursera", ...], "counts": [8, 5, ...] }`
- `GET /dashboard/certificates/timeline` - Timeline de certificados
  - Response: `{ "timeline": ["2020-01", "2020-06", ...], "counts": [2, 3, ...] }`
- `GET /dashboard/summary` - Resumo geral para o dashboard
  - Response: Estatísticas consolidadas com totais, top habilidades e certificados recentes

> Para rotas protegidas, inclua o header: `Authorization: Bearer {token}`

## 💻 Como executar

1. Clone o repositório
```bash
git clone https://github.com/samuelcamargo/node-portfolio.git
cd node-portfolio
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Criar índices do MongoDB
npm run mongodb:indexes

# Build
npm run build

# Lint
npm run lint
```

## 🔧 Variáveis de Ambiente

> **Importante**: Nunca compartilhe ou commite suas credenciais reais.
> Use o .env.example como template e mantenha suas credenciais seguras.

Veja o arquivo `.env.example` para as variáveis necessárias.

## 🗄️ Banco de Dados

O projeto utiliza MongoDB como banco de dados:

### Collections
- users
  - _id (ObjectId)
  - username (string, unique)
  - password (string, hashed)

### Índices
- username: índice único para busca rápida e unicidade

### Usuário Inicial
O sistema cria automaticamente um usuário inicial para desenvolvimento.
> **Nota**: Por questões de segurança, as credenciais não são expostas na documentação.

## 🧪 Testes

O projeto utiliza Jest para testes unitários. Os testes cobrem:

### Casos de Uso
- AuthUseCase
  - Autenticação
  - Validações
- UserUseCase
  - CRUD de usuários
  - Validações de negócio

### Comandos
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov
```

### Cobertura
O projeto mantém alta cobertura de testes (~100%)

## 📦 Princípios e Padrões

- SOLID
- Clean Architecture
- Dependency Injection
- Repository Pattern
- DTO Pattern
- Factory Pattern
- Middleware Pattern
- Test Driven Development (TDD)
- Database Abstraction
- NoSQL Patterns

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

> **Nota**: Certifique-se de adicionar testes para novas funcionalidades

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Samuel Camargo

---

⌨️ com ☕ por [Samuel Camargo](https://github.com/samuelcamargo)
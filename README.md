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
  - Body: `{ "username": "string", "password": "string" }`

### Rotas Protegidas
- `GET /users/profile` - Obter perfil do usuário (requer token JWT)
  - Header: `Authorization: Bearer {token}`
- `GET /sobre` - Rota protegida de exemplo
  - Header: `Authorization: Bearer {token}`

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

# Lint com correção automática
npm run lint -- --fix
```

## 🔧 Variáveis de Ambiente

```env
PORT=3000
JWT_SECRET=your_strong_secret_here
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

## 🧹 Manutenção

```

## 🔧 Variáveis de Ambiente

> **Importante**: Nunca compartilhe ou commite suas credenciais reais.
> Use o .env.example como template e mantenha suas credenciais seguras.
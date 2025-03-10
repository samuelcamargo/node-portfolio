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
JWT_SECRET=your_secret_here
MONGODB_URI=your_mongodb_uri_here
```

## 🧹 Manutenção

```bash
# Remover arquivos de build
rm -rf dist/

# Limpar cache
npm cache clean --force

# Remover e reinstalar dependências
rm -rf node_modules/
npm install
```

## 🗄️ Banco de Dados

O projeto utiliza MongoDB como banco de dados:

### Collections
- users
  - username (string, unique)
  - password (string, hashed)
  - _id (ObjectId)

### Índices
- username: índice único para busca rápida e unicidade

### Usuário Padrão
O sistema cria automaticamente um usuário inicial:
- Username: samuelcamargo
- Password: 123456

## 🧪 Testes

O projeto utiliza Jest para testes unitários. Os testes cobrem:

### Casos de Uso
- AuthUseCase
  - Autenticação com credenciais válidas
  - Rejeição de usuário inválido
  - Rejeição de senha inválida

- UserUseCase
  - Criação de usuário
  - Atualização de usuário
  - Exclusão de usuário
  - Listagem de usuários
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
O projeto mantém uma alta cobertura de testes:
- Statements: ~100%
- Branches: ~100%
- Functions: ~100%
- Lines: ~100%

### Estrutura dos Testes
```
src/
├── application/
│   └── useCases/
│       ├── AuthUseCase.spec.ts
│       └── UserUseCase.spec.ts
├── test/
│   └── setup.ts      # Configuração global dos testes
└── jest.config.ts    # Configuração do Jest
```

### Mocks
Os testes utilizam mocks para:
- Repositórios
- Providers (Hash, Token)
- Dependências externas
- MongoDB

## 📦 Princípios e Padrões

- SOLID
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion Principle
- Clean Architecture
- Dependency Injection
- Repository Pattern
- DTO Pattern
- Factory Pattern
- Middleware Pattern
- Test Driven Development (TDD)
- Mocking
- Unit Testing
- Database Abstraction
- NoSQL Patterns

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

> **Nota**: Certifique-se de adicionar testes para novas funcionalidades

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Samuel Camargo

---

⌨️ com ☕ por [Samuel Camargo](https://github.com/samuelcamargo)

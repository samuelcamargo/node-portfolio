# API de Autenticação - Node Portfolio

Backend em Node.js do meu portfólio front em Next.js, desenvolvido com TypeScript seguindo princípios SOLID e Clean Architecture.

## 🛠️ Status do Projeto

- ✅ Autenticação JWT
- ✅ Documentação Swagger
- ✅ Banco de dados SQLite
- ✅ Linting e formatação de código
- ✅ Estrutura Clean Architecture

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- SQLite
- TypeORM
- JWT (JSON Web Token)
- Swagger
- Jest
- ESLint

## 📁 Arquitetura

O projeto segue os princípios da Clean Architecture e SOLID:

```
src/
   ├── domain/              # Regras de negócio da aplicação
   │   ├── entities/        # Entidades do domínio
   │   └── repositories/    # Interfaces dos repositórios
   │
   ├── infra/              # Implementações de infraestrutura
   │   ├── database/       # Configurações e repositórios do banco
   │   └── http/          # Controllers, middlewares e rotas
   │       ├── controllers/
   │       ├── middlewares/
   │       └── routes/
   │
   ├── config/            # Configurações da aplicação
   │   └── swagger.ts     # Configuração do Swagger
   │
   ├── types/            # Definições de tipos
   │   └── swagger.d.ts
   │
   └── main/             # Ponto de entrada da aplicação
       └── server.ts
```

## 🔐 Funcionalidades

- Autenticação de usuários com JWT
- Rota protegida de exemplo
- Documentação interativa com Swagger
- Validações de dados
- Criptografia de senha com bcrypt

## 📝 Documentação

A documentação da API está disponível através do Swagger UI em:
`http://localhost:3000/api-docs`

## 🚦 Rotas

### Autenticação
- `POST /auth` - Autenticação de usuário
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "string", "expire_in": "number" }`

### Rotas Protegidas
- `GET /sobre` - Rota protegida de exemplo (requer token JWT)
  - Header: `Authorization: Bearer {token}`
  - Response: `{ "message": "ok" }`

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

# Build
npm run build

# Lint
npm run lint

# Lint com correção automática
npm run lint -- --fix
```

## 🔑 Usuário padrão

O sistema cria automaticamente um usuário padrão para testes:
```json
{
  "username": "string",
  "password": "string"
}
```

> Nota: Por questões de segurança, as credenciais padrão não são expostas na documentação. 
> Entre em contato com o administrador do sistema para obter acesso.

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 🔧 Variáveis de Ambiente

```env
PORT=3000
JWT_SECRET=your_secret_here
DATABASE_PATH=./src/database/database.sqlite
```

## 🧹 Limpeza e Manutenção

Para manter o projeto organizado:

```bash
# Remover arquivos de build
rm -rf dist/

# Limpar cache
npm cache clean --force

# Remover e reinstalar dependências
rm -rf node_modules/
npm install
```

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Samuel Camargo

---

⌨️ com Cafe por [Samuel Camargo](https://github.com/samuelcamargo)

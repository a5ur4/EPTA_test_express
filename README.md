# 🚗 Sistema de Gerenciamento de Veículos - EPTA API REST

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.16-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.11-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-336791.svg)](https://www.postgresql.org/)

## 📋 Descrição

API REST completa para gerenciamento de usuários e veículos, desenvolvida em Node.js com TypeScript. O sistema permite autenticação JWT, CRUD completo de usuários e veículos, com funcionalidades de logout seguro e validação robusta de dados.

**Teste Técnico - Desenvolvido por:** [Pedro Bastos](https://github.com/a5ur4)

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js + TypeScript + Express.js
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **Autenticação:** JWT (JSON Web Tokens)
- **Validação:** Zod
- **Criptografia:** bcryptjs
- **Estrutura:** Arquitetura em camadas (Routes → Controllers → Services → Database)

## 🏗️ Arquitetura do Projeto

```
src/
├── config/           # Configurações (Database)
├── controllers/      # Controllers (Lógica de requisição/resposta)
├── interfaces/       # Interfaces TypeScript
├── middlewares/      # Middlewares (Autenticação, Validação)
├── routes/           # Definição de rotas
├── schemas/          # Schemas de validação (Zod)
├── services/         # Lógica de negócio
├── utils/            # Utilitários (Blacklist de tokens)
├── generated/        # Código gerado pelo Prisma
├── app.ts           # Configuração do Express
└── server.ts        # Servidor principal
```

## 🚀 Funcionalidades

### 👤 **Gestão de Usuários**
- ✅ Cadastro de usuários com validação
- ✅ Login com autenticação JWT
- ✅ Logout com invalidação de token
- ✅ Perfil do usuário autenticado
- ✅ CRUD completo de usuários
- ✅ Criptografia de senhas (bcrypt)

### 🚗 **Gestão de Veículos**
- ✅ Cadastro de veículos vinculados ao usuário
- ✅ Listagem de veículos
- ✅ Busca por ID e por usuário
- ✅ Atualização de dados do veículo
- ✅ Atualização de status (ATIVO/INATIVO)
- ✅ Exclusão de veículos
- ✅ Validação de tipos de veículo

### 🔐 **Segurança**
- ✅ Autenticação JWT com middleware
- ✅ Blacklist de tokens para logout seguro
- ✅ Validação de dados com Zod
- ✅ Criptografia de senhas
- ✅ Proteção de rotas

## 📦 Instalação e Configuração

### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- PostgreSQL (versão 15 ou superior)
- npm ou yarn

### **1. Clone o repositório**
```bash
git clone https://github.com/a5ur4/EPTA_test_express
cd epta_test_express
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/epta_db"

# JWT
JWT_SECRET="sua_chave_secreta_super_segura_com_no_minimo_32_caracteres"

# Server
PORT=3001
```

### **4. Configure o banco de dados**
```bash
# Gere o cliente Prisma
npm run prisma:generate

# Execute as migrações
npm run prisma:migrate
```

### **5. Inicie o servidor**
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

O servidor estará rodando em: `http://localhost:3001`

## 📚 Documentação da API

### **Base URL**
```
http://localhost:3001
```

### **🔐 Autenticação**

#### **Cadastro**
```http
POST /auth/register
Content-Type: application/json

{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123456"
}
```

#### **Login**
```http
POST /auth/login
Content-Type: application/json

{
    "email": "joao@email.com",
    "password": "senha123456"
}
```

#### **Logout**
```http
POST /auth/logout
Authorization: Bearer SEU_TOKEN_AQUI
```

### **👤 Usuários (Protegidas)**

#### **Perfil do usuário**
```http
GET /auth/me
Authorization: Bearer SEU_TOKEN_AQUI
```

#### **Listar usuários**
```http
GET /auth
Authorization: Bearer SEU_TOKEN_AQUI
```

#### **Buscar por ID**
```http
GET /auth/{id}
Authorization: Bearer SEU_TOKEN_AQUI
```

#### **Atualizar usuário**
```http
PUT /auth/{id}
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
    "name": "João Silva Santos",
    "email": "joao.santos@email.com",
    "password": "novaSenha123"
}
```

#### **Deletar usuário**
```http
DELETE /auth/{id}
Authorization: Bearer SEU_TOKEN_AQUI
```

### **🚗 Veículos (Protegidas)**

#### **Cadastrar veículo**
```http
POST /vehicles
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
    "name": "Honda Civic",
    "plateNumber": "ABC1234",
    "year": 2023,
    "type": "CARRO",
    "color": "Preto"
}
```

#### **Listar veículos**
```http
GET /vehicles
Authorization: Bearer SEU_TOKEN_AQUI
```

#### **Buscar por ID**
```http
GET /vehicles/{id}
Authorization: Bearer SEU_TOKEN_AQUI
```

#### **Veículos do usuário**
```http
GET /vehicles/user/{userId}
Authorization: Bearer SEU_TOKEN_AQUI
```

#### **Atualizar veículo**
```http
PUT /vehicles/{id}
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
    "name": "Honda Civic Touring",
    "plateNumber": "ABC1234",
    "year": 2023,
    "type": "CARRO",
    "color": "Branco"
}
```

#### **Atualizar status**
```http
PATCH /vehicles/{id}/status
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json

{
    "status": "INATIVO"
}
```

#### **Deletar veículo**
```http
DELETE /vehicles/{id}
Authorization: Bearer SEU_TOKEN_AQUI
```

## 📊 Estrutura do Banco de Dados

### **Usuário (User)**
```sql
- id: String (CUID)
- email: String (único)
- name: String
- password: String (criptografado)
- createdAt: DateTime
- updatedAt: DateTime
- vehicles: Vehicle[] (relacionamento)
```

### **Veículo (Vehicle)**
```sql
- id: String (CUID)
- name: String
- plateNumber: String (único, 7 caracteres)
- type: Enum (CARRO, MOTO, CAMINHAO, ONIBUS, VAN)
- color: String (opcional)
- year: Int
- status: Enum (ATIVO, INATIVO)
- userId: String (chave estrangeira)
- user: User (relacionamento)
- createdAt: DateTime
- updatedAt: DateTime
```

## ✅ Validações Implementadas

### **Usuário**
- **Nome:** Mínimo 3 caracteres
- **Email:** Formato válido e único
- **Senha:** Mínimo 6 caracteres

### **Veículo**
- **Nome:** Mínimo 3 caracteres
- **Placa:** Exatamente 7 caracteres
- **Ano:** Entre 1900 e ano atual + 1
- **Tipo:** CARRO, MOTO, CAMINHAO, ONIBUS, VAN
- **Cor:** Mínimo 3 caracteres (opcional)
- **Status:** ATIVO ou INATIVO

## 🧪 Testando a API

### **Exemplo com cURL**
```bash
# 1. Cadastrar usuário
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@email.com","password":"senha123456"}'

# 2. Fazer login (salve o token)
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"senha123456"}'

# 3. Cadastrar veículo (use o token)
curl -X POST http://localhost:3001/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"name":"Honda Civic","plateNumber":"ABC1234","year":2023,"type":"CARRO","color":"Preto"}'
```

### **Ferramentas Recomendadas**
- **Postman** ou **Insomnia** para testes de API
- **pgAdmin** para visualizar o banco PostgreSQL
- Arquivo `API_TEST_EXAMPLES.md` com exemplos completos

## 📁 Scripts Disponíveis

```bash
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila TypeScript para JavaScript
npm start            # Inicia servidor de produção
npm run prisma:generate  # Gera cliente Prisma
npm run prisma:migrate   # Executa migrações do banco
```

## 🔧 Estrutura de Resposta da API

### **Sucesso**
```json
{
    "success": true,
    "message": "Operação realizada com sucesso",
    "data": {
        // dados retornados
    }
}
```

### **Erro**
```json
{
    "success": false,
    "error": "Mensagem de erro detalhada"
}
```

## 🛡️ Segurança Implementada

- **Autenticação JWT** com expiração de 24 horas
- **Blacklist de tokens** para logout seguro
- **Criptografia bcrypt** para senhas (salt rounds: 12)
- **Validação rigorosa** de entrada com Zod
- **Middleware de proteção** para rotas sensíveis
- **Sanitização** de dados de resposta (sem senhas)

## 📝 Considerações Técnicas

### **Padrões Utilizados**
- **Arquitetura em camadas** para separação de responsabilidades
- **Dependency Injection** manual
- **Error Handling** centralizado com try/catch
- **Validação** em múltiplas camadas
- **Tipagem forte** com TypeScript

### **Decisões de Design**
- **Prisma ORM** para type-safety e migrations
- **Zod** para validação de runtime
- **bcryptjs** para hashing de senhas
- **JWT** para autenticação stateless
- **Express** pela simplicidade e maturidade

### 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico.
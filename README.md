# Backend TypeScript Básico

Um servidor backend simples construído com TypeScript e Express, configurado para usar CommonJS, com **autenticação JWT-style** e **validação de dados**.

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env-example .env

# Edite as variáveis conforme necessário
# PORT=3000
# API_KEY=infnet-2025-secret-key
# DB_PATH=fakeDB.json
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

### 4. Executar com auto-reload (recomendado para desenvolvimento)

```bash
npm run dev:watch
```

### 5. Build para produção

```bash
npm run build
npm start
```

## 📚 Documentação

-   **[README-INVERSIFY.md](./README-INVERSIFY.md)** - Documentação completa sobre Inversify e Injeção de Dependência

## 📁 Estrutura do projeto

```
src/
├── 1entidades/                    # Entidades do domínio
│   └── Livro.ts                   # Classe da entidade Livro
├── 2domain/                       # Camada de domínio
│   ├── dtos/                      # Data Transfer Objects
│   │   └── LivroDTO.ts           # DTOs para transferência de dados
│   ├── exceptions/                # Exceções customizadas
│   │   ├── CustomErros.ts        # Classe base de exceções
│   │   └── NotFoundError.ts      # Exceção para recursos não encontrados
│   ├── interfaces/                # Interfaces e contratos
│   │   ├── LivrosServiceInterface.ts # Interface do serviço de livros
│   │   └── LivroRepositorioInterface.ts # Interface do repositório
│   └── services/                  # Serviços de domínio
│       └── LivrosService.ts      # Lógica de negócio dos livros
├── 3infra/                        # Camada de infraestrutura
│   ├── middlewares/               # Middlewares do Express
│   │   ├── Auth.ts               # Middleware de autenticação
│   │   ├── ErrorHandler.ts       # Middleware de tratamento de erros
│   │   └── Logger.ts             # Middleware de logging
│   └── repositorios/              # Repositórios de dados
│       ├── LivroRepositorio.ts   # Implementação do repositório
│       ├── LivroSchema.ts        # Schema do banco de dados
│       ├── DBSchema.ts           # Schema do banco completo
│       └── fakeDB.json           # Banco de dados JSON
├── 4webApi/                       # Camada de apresentação
│   ├── controllers/               # Controladores da API
│   │   └── LivrosController.ts   # Controlador de livros
│   └── routes.ts                 # Configuração das rotas
├── __tests__/                     # Testes automatizados
│   └── app.spec.ts               # Testes da aplicação
├── main.ts                        # Arquivo principal do servidor
└── types/                         # Centralizador de tipos
    └── index.ts                   # Exportações centralizadas

# Arquivos de configuração
├── .env                          # Variáveis de ambiente (criar a partir do .env-example)
├── .env-example                  # Exemplo de variáveis de ambiente
├── dist/                         # Arquivos compilados (criado após build)
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração do TypeScript (CommonJS)
├── eslint.config.ts              # Configuração moderna do ESLint (flat config)
└── nodemon.json                  # Configuração do Nodemon
```

## 🔧 Scripts disponíveis

-   `npm run dev` - Executa em modo desenvolvimento com ts-node
-   `npm run dev:watch` - Executa com auto-reload usando Nodemon (recomendado)
-   `npm run build` - Compila TypeScript para JavaScript
-   `npm start` - Executa versão compilada
-   `npm run watch` - Compila automaticamente ao alterar arquivos
-   `npm run lint` - Executa o ESLint para verificar qualidade do código
-   `npm run lint:fix` - Executa o ESLint e corrige problemas automaticamente

## 🌐 Rotas disponíveis

### 🔓 Rotas Públicas (sem autenticação)

-   `GET /` - Página inicial com mensagem de boas-vindas
-   `GET /api/status` - Status do servidor

### 🔐 Rotas Protegidas (requer API Key)

-   `GET /api/livros` - Lista todos os livros
-   `GET /api/livros/:id` - Busca livro por ID
-   `POST /api/livros` - Cria novo livro
-   `PATCH /api/livros/:id` - Atualiza livro existente
-   `DELETE /api/livros/:id` - Remove livro

## ⚙️ Variáveis de Ambiente

O projeto usa **dotenv** para gerenciar configurações. Copie `.env-example` para `.env` e configure:

| Variável    | Descrição             | Padrão                   |
| ----------- | --------------------- | ------------------------ |
| `PORT`      | Porta do servidor     | `3000`                   |
| `NODE_ENV`  | Ambiente de execução  | `development`            |
| `API_KEY`   | Chave de autenticação | `infnet-2025-secret-key` |
| `DB_PATH`   | Caminho do banco JSON | `fakeDB.json`            |
| `LOG_LEVEL` | Nível de log          | `info`                   |

## 🔑 Autenticação

O projeto implementa **autenticação baseada em API Key** para proteger as rotas de livros:

### Como usar:

```bash
# Header x-api-key
curl -H "x-api-key: infnet-2025-secret-key" http://localhost:3000/api/livros

# Header Authorization
curl -H "Authorization: infnet-2025-secret-key" http://localhost:3000/api/livros
```

### Configuração:

-   **API Key padrão:** `infnet-2025-secret-key`
-   **Variável de ambiente:** `API_KEY` (definida no `.env`)
-   **Headers aceitos:** `x-api-key` ou `authorization`

## ✅ Validação de Dados

O projeto usa **Express Validator** para validação de entrada:

### Validações implementadas:

-   **ID numérico** para rotas com parâmetro `:id`
-   **Campos obrigatórios** para criação de livros (título, autor, ano)
-   **Mensagens de erro personalizadas** em português
-   **Status HTTP apropriados** (400 para validação, 401 para autenticação, 403 para acesso negado)

## 📝 Tecnologias utilizadas

-   TypeScript
-   Express.js
-   Node.js
-   Express Validator (validação de dados)
-   Dotenv (gerenciamento de variáveis de ambiente)
-   Inversify (injeção de dependência)
-   Reflect-metadata (suporte a decoradores)
-   ESLint 9.x (configuração moderna flat config)
-   Nodemon (para auto-reload em desenvolvimento)

## ⚙️ Configuração TypeScript

O projeto está configurado para usar **CommonJS**:

-   **`"module": "CommonJS"`** - Permite usar `__dirname` diretamente
-   **`"moduleResolution": "node10"`** - Resolução de módulos estilo Node.js
-   **`"types": ["node"]`** - Inclui definições de tipos do Node.js
-   **Sem `"type": "module"`** - Padrão CommonJS

## 🧹 Qualidade do Código

O projeto inclui ESLint 9.x configurado com a nova sintaxe flat config:

-   **Configuração moderna** usando `eslint.config.ts`
-   **Verificação de sintaxe** e boas práticas
-   **Regras específicas** para TypeScript
-   **Formatação automática** do código
-   **Detecção de problemas** comuns
-   **Suporte a módulos CommonJS**
-   **Reconhecimento de variáveis globais** do Node.js (incluindo `__dirname`)
-   **Suporte nativo** a arquivos de configuração TypeScript
-   **Estrutura organizada** que facilita a manutenção do código

## 🔄 Auto-reload com Nodemon

O projeto inclui Nodemon configurado para:

-   **Monitorar alterações** nos arquivos `.ts`, `.js` e `.json`
-   **Reiniciar automaticamente** o servidor quando houver mudanças
-   **Ignorar arquivos** de teste e build
-   **Delay de 1 segundo** para evitar reinicializações excessivas
-   **Funciona perfeitamente** com a nova estrutura de pastas

## 🎯 Funcionalidades

-   **API REST** com Express
-   **Autenticação por API Key** para rotas protegidas
-   **Validação de dados** com Express Validator
-   **CRUD completo** de livros com validações
-   **Repositório de dados** usando arquivo JSON
-   **Tipagem forte** com TypeScript
-   **Arquitetura em camadas** com separação clara de responsabilidades
-   **Organização profissional** com estrutura numerada e hierárquica
-   **Gerenciamento de configurações** com dotenv
-   **Hot reload** em desenvolvimento
-   **Build otimizado** para produção
-   **Estrutura escalável** para novos recursos e funcionalidades

## 🗂️ Organização do Código

O projeto segue uma **arquitetura em camadas** com separação clara de responsabilidades:

### 🏗️ **Arquitetura em Camadas:**

1. **`1entidades/`** - **Camada de Entidades**

    - Classes que representam os objetos de negócio
    - Contém a lógica básica das entidades do domínio

2. **`2domain/`** - **Camada de Domínio**

    - **`dtos/`** - Objetos de transferência de dados
    - **`exceptions/`** - Exceções customizadas do domínio
    - **`interfaces/`** - Contratos e interfaces
    - **`services/`** - Lógica de negócio e regras de domínio

3. **`3infra/`** - **Camada de Infraestrutura**

    - **`middlewares/`** - Middlewares do Express (Auth, Logger, ErrorHandler)
    - **`repositorios/`** - Acesso a dados, persistência e schemas

4. **`4webApi/`** - **Camada de Apresentação**
    - **`controllers/`** - Controladores da API REST
    - **`routes.ts`** - Configuração das rotas

### 🎯 **Benefícios desta Organização:**

-   ✅ **Separação clara de responsabilidades**
-   ✅ **Fácil manutenção e evolução**
-   ✅ **Testabilidade aprimorada**
-   ✅ **Reutilização de código**
-   ✅ **Escalabilidade para novos recursos**
-   ✅ **Padrão de nomenclatura consistente**

### 📝 **Nomenclatura das Pastas:**

A nomenclatura com números prefixos garante uma ordem lógica de execução e dependências:

-   **`1entidades/`** - Base do domínio, sem dependências
-   **`2domain/`** - Lógica de negócio, depende das entidades
-   **`3infra/`** - Infraestrutura, implementa interfaces do domínio
-   **`4webApi/`** - Apresentação, orquestra todas as camadas

## 📊 Banco de Dados

-   **`src/3infra/repositorios/fakeDB.json`** - Arquivo JSON com dados de exemplo
-   **`src/3infra/repositorios/LivroRepositorio.ts`** - Classe para gerenciar operações CRUD
-   **`src/3infra/repositorios/LivroSchema.ts`** - Schema tipado para validação
-   **`src/3infra/repositorios/DBSchema.ts`** - Schema do banco completo

## 🚀 Deploy

Para fazer deploy em produção:

1. Execute `npm run build` para compilar
2. Configure as variáveis de ambiente no `.env` ou no sistema
3. Use `npm start` para executar a versão compilada
4. Use um process manager como PM2 para produção

## 🔒 Segurança

-   **Autenticação obrigatória** para operações de livros
-   **Validação de entrada** para prevenir dados inválidos
-   **Headers seguros** para transmissão de credenciais
-   **Mensagens de erro genéricas** para não expor informações sensíveis
-   **Configurações sensíveis** em variáveis de ambiente (não versionadas)
-   **Separação de responsabilidades** que facilita auditoria de segurança
-   **Estrutura organizada** que previne vazamentos de dados

## 📚 Exemplos de Uso

### Criar um livro:

```bash
curl -X POST http://localhost:3000/api/livros \
  -H "x-api-key: infnet-2025-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"O Senhor dos Anéis","autor":"J.R.R. Tolkien","ano":1954}'
```

**Nota:** A API Key pode ser configurada no arquivo `.env` com a variável `API_KEY`.

### Buscar livro por ID:

```bash
curl -H "x-api-key: infnet-2025-secret-key" http://localhost:3000/api/livros/1
```

### Atualizar livro:

```bash
curl -X PATCH http://localhost:3000/api/livros/1 \
  -H "x-api-key: infnet-2025-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"O Senhor dos Anéis - Edição Atualizada"}'
```

### Deletar livro:

```bash
curl -X DELETE http://localhost:3000/api/livros/1 \
  -H "x-api-key: infnet-2025-secret-key"
```

## 🔄 Inversify - Injeção de Dependência

O projeto utiliza **Inversify** para gerenciar dependências de forma automática e desacoplada.

### Como funciona:

-   **Container centralizado** em `src/4webApi/config/InversifyConfig.ts`
-   **Decoradores** `@injectable()` e `@inject()` para injeção automática
-   **Resolução automática** de dependências: Controller → Service → Repository

### Documentação completa:

📖 **[README-INVERSIFY.md](./README-INVERSIFY.md)** - Guia detalhado sobre Inversify

## 🔧 Configuração Avançada

### Personalizando variáveis de ambiente:

```bash
# Edite o arquivo .env
PORT=8080
API_KEY=minha-chave-super-secreta
DB_PATH=meu-banco.json
NODE_ENV=production
```

### Usando variáveis de ambiente do sistema:

```bash
# Linux/Mac
export PORT=8080
export API_KEY=minha-chave-super-secreta
npm run dev

# Windows
set PORT=8080
set API_KEY=minha-chave-super-secreta
npm run dev
```

### Adicionando novos recursos:

Com a nova estrutura, é fácil adicionar novos recursos:

1. **Nova entidade**: Adicione em `src/1entidades/`
2. **Novo DTO**: Adicione em `src/2domain/dtos/`
3. **Nova exceção**: Adicione em `src/2domain/exceptions/`
4. **Nova interface**: Adicione em `src/2domain/interfaces/`
5. **Novo serviço**: Adicione em `src/2domain/services/`
6. **Novo middleware**: Adicione em `src/3infra/middlewares/`
7. **Novo repositório/schema**: Adicione em `src/3infra/repositorios/`
8. **Novo controlador**: Adicione em `src/4webApi/controllers/`
9. **Atualize as rotas**: Modifique `src/4webApi/routes.ts`
10. **Atualize os tipos**: Modifique `src/types/index.ts`

# Backend TypeScript Básico

Um servidor backend simples construído com TypeScript e Express, configurado para usar CommonJS, com **autenticação JWT-style** e **validação de dados**.

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

### 3. Executar com auto-reload (recomendado para desenvolvimento)

```bash
npm run dev:watch
```

### 4. Build para produção

```bash
npm run build
npm start
```

## 📁 Estrutura do projeto

-   `src/main.ts` - Arquivo principal do servidor
-   `src/Api/` - Controladores e rotas da API
-   `src/Infra/` - Repositórios, banco de dados e autenticação
-   `src/entities/` - Entidades do domínio da aplicação
-   `src/dtos/` - Data Transfer Objects para transferência de dados
-   `src/schemas/` - Schemas e tipos do banco de dados
-   `src/types/` - Arquivo de índice centralizando todas as exportações
-   `dist/` - Arquivos compilados (criado após build)
-   `package.json` - Dependências e scripts
-   `tsconfig.json` - Configuração do TypeScript (CommonJS)
-   `eslint.config.ts` - Configuração moderna do ESLint (flat config)
-   `nodemon.json` - Configuração do Nodemon

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
-   **Variável de ambiente:** `API_KEY` (opcional)
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

-   Configuração moderna usando `eslint.config.ts`
-   Verificação de sintaxe e boas práticas
-   Regras específicas para TypeScript
-   Formatação automática do código
-   Detecção de problemas comuns
-   Suporte a módulos CommonJS
-   Reconhecimento de variáveis globais do Node.js (incluindo `__dirname`)
-   Suporte nativo a arquivos de configuração TypeScript

## 🔄 Auto-reload com Nodemon

O projeto inclui Nodemon configurado para:

-   Monitorar alterações nos arquivos `.ts`, `.js` e `.json`
-   Reiniciar automaticamente o servidor quando houver mudanças
-   Ignorar arquivos de teste e build
-   Delay de 1 segundo para evitar reinicializações excessivas

## 🎯 Funcionalidades

-   **API REST** com Express
-   **Autenticação por API Key** para rotas protegidas
-   **Validação de dados** com Express Validator
-   **CRUD completo** de livros com validações
-   **Repositório de dados** usando arquivo JSON
-   **Tipagem forte** com TypeScript
-   **Estrutura modular** com separação de responsabilidades
-   **Organização profissional** com pastas específicas para cada tipo de arquivo
-   **Hot reload** em desenvolvimento
-   **Build otimizado** para produção

## 🗂️ Organização do Código

O projeto segue uma arquitetura limpa e organizada:

-   **`entities/`** - Classes de entidades do domínio
-   **`dtos/`** - Objetos de transferência de dados
-   **`schemas/`** - Tipos e schemas do banco de dados
-   **`types/`** - Arquivo centralizador de exportações
-   **`Api/`** - Controladores e rotas da API
-   **`Infra/`** - Repositórios, infraestrutura e autenticação

Esta organização facilita a manutenção, escalabilidade e legibilidade do código.

## 📊 Banco de Dados

-   **fakeDB.json** - Arquivo JSON com dados de exemplo
-   **LivroRepositorio** - Classe para gerenciar operações CRUD
-   **Esquemas tipados** - Interfaces TypeScript para validação

## 🚀 Deploy

Para fazer deploy em produção:

1. Execute `npm run build` para compilar
2. Use `npm start` para executar a versão compilada
3. Configure variáveis de ambiente se necessário (ex: `API_KEY`)
4. Use um process manager como PM2 para produção

## 🔒 Segurança

-   **Autenticação obrigatória** para operações de livros
-   **Validação de entrada** para prevenir dados inválidos
-   **Headers seguros** para transmissão de credenciais
-   **Mensagens de erro genéricas** para não expor informações sensíveis

## 📚 Exemplos de Uso

### Criar um livro:

```bash
curl -X POST http://localhost:3000/api/livros \
  -H "x-api-key: infnet-2025-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"O Senhor dos Anéis","autor":"J.R.R. Tolkien","ano":1954}'
```

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

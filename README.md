# Backend TypeScript Básico

Um servidor backend simples construído com TypeScript e Express, configurado para usar CommonJS.

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
-   `src/Infra/` - Repositórios e esquemas de dados
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

-   `GET /` - Página inicial com mensagem de boas-vindas
-   `GET /api/status` - Status do servidor
-   `GET /api/livros` - Lista todos os livros
-   `GET /api/livros/:id` - Busca livro por ID

## 📝 Tecnologias utilizadas

-   TypeScript
-   Express.js
-   Node.js
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
-   **Repositório de dados** usando arquivo JSON
-   **Tipagem forte** com TypeScript
-   **Estrutura modular** com separação de responsabilidades
-   **Hot reload** em desenvolvimento
-   **Build otimizado** para produção

## 📊 Banco de Dados

-   **fakeDB.json** - Arquivo JSON com dados de exemplo
-   **LivroRepositorio** - Classe para gerenciar operações CRUD
-   **Esquemas tipados** - Interfaces TypeScript para validação

## 🚀 Deploy

Para fazer deploy em produção:

1. Execute `npm run build` para compilar
2. Use `npm start` para executar a versão compilada
3. Configure variáveis de ambiente se necessário
4. Use um process manager como PM2 para produção

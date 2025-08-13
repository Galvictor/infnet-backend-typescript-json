# Backend TypeScript Básico

Um servidor backend simples construído com TypeScript e Express.

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
-   `dist/` - Arquivos compilados (criado após build)
-   `package.json` - Dependências e scripts
-   `tsconfig.json` - Configuração do TypeScript
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

## 📝 Tecnologias utilizadas

-   TypeScript
-   Express.js
-   Node.js
-   ESLint 9.x (configuração moderna flat config)
-   Nodemon (para auto-reload em desenvolvimento)

## 🧹 Qualidade do Código

O projeto inclui ESLint 9.x configurado com a nova sintaxe flat config:

-   Configuração moderna usando `eslint.config.ts`
-   Verificação de sintaxe e boas práticas
-   Regras específicas para TypeScript
-   Formatação automática do código
-   Detecção de problemas comuns
-   Suporte a módulos ES
-   Reconhecimento de variáveis globais do Node.js
-   Suporte nativo a arquivos de configuração TypeScript

## 🔄 Auto-reload com Nodemon

O projeto inclui Nodemon configurado para:

-   Monitorar alterações nos arquivos `.ts`, `.js` e `.json`
-   Reiniciar automaticamente o servidor quando houver mudanças
-   Ignorar arquivos de teste e build
-   Delay de 1 segundo para evitar reinicializações excessivas

## ⚡ Configuração Moderna

-   **ESLint 9.x**: Versão mais recente com suporte nativo a TypeScript
-   **Flat Config**: Nova sintaxe mais limpa e eficiente
-   **Módulos ES**: Suporte nativo a import/export
-   **TypeScript**: Configuração otimizada para desenvolvimento moderno
-   **Versão Compatível**: TypeScript 5.3.3 para máxima compatibilidade
-   **Configuração TypeScript**: ESLint configurado em `.ts` para melhor tipagem

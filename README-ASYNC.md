# Implementação Assíncrona - Async/Await

Este documento explica as implementações assíncronas criadas no projeto, demonstrando como migrar de código síncrono para assíncrono usando **async/await** e **Promises**.

## 📋 Índice

-   [Visão Geral](#-visão-geral)
-   [Arquivos Criados](#-arquivos-criados)
-   [Conceitos Fundamentais](#-conceitos-fundamentais)
-   [Implementações por Camada](#-implementações-por-camada)
-   [Comparação Síncrono vs Assíncrono](#-comparação-síncrono-vs-assíncrono)
-   [Exemplos Práticos](#-exemplos-práticos)
-   [Benefícios da Implementação Assíncrona](#-benefícios-da-implementação-assíncrona)
-   [Considerações de Performance](#-considerações-de-performance)

## 🎯 Visão Geral

O projeto foi expandido para incluir implementações assíncronas que demonstram:

-   **Migração de código síncrono para assíncrono**
-   **Uso de async/await vs callbacks**
-   **Implementação de Promises**
-   **Padrões de arquitetura assíncrona**
-   **Tratamento de erros em operações assíncronas**

## 📁 Arquivos Criados

### Repositórios Assíncronos

-   `src/3infra/repositorios/LivroAsyncRepositorio.ts` - Repositório JSON assíncrono
-   `src/3infra/repositorios/LivroAsyncMongoRepositorio.ts` - Repositório MongoDB assíncrono (já existia)

### Serviços Assíncronos

-   `src/2domain/services/LivrosAsyncService.ts` - Serviço para FileSystem assíncrono
-   `src/2domain/services/LivrosAsyncMongoService.ts` - Serviço para MongoDB assíncrono

### Controllers Assíncronos

-   `src/4webApi/controllers/LivrosAsyncController.ts` - Controller para FileSystem assíncrono
-   `src/4webApi/controllers/LivrosAsyncMongoController.ts` - Controller para MongoDB assíncrono

### Interfaces Assíncronas

-   `src/2domain/interfaces/LivroAsyncRepositorioInterface.ts` - Interface do repositório assíncrono
-   `src/2domain/interfaces/LivrosAsyncServiceInterface.ts` - Interface do serviço assíncrono

## 🔧 Conceitos Fundamentais

### Async/Await vs Callbacks

**Código Síncrono (Original):**

```typescript
public listarLivros(): LivroSchema[] {
    const db = this.acessarDB();
    return db.livros;
}
```

**Código Assíncrono (Nova Implementação):**

```typescript
public async listarLivros(): Promise<LivroSchema[]> {
    const db = await this.acessarDB();
    return db.livros;
}
```

### Principais Diferenças

| Aspecto                | Síncrono         | Assíncrono          |
| ---------------------- | ---------------- | ------------------- |
| **Retorno**            | `Tipo`           | `Promise<Tipo>`     |
| **Método**             | `metodo()`       | `async metodo()`    |
| **Chamada**            | `metodo()`       | `await metodo()`    |
| **Tratamento de Erro** | try/catch direto | try/catch com await |
| **Operações I/O**      | Bloqueante       | Não-bloqueante      |

## 🏗️ Implementações por Camada

### 1. Camada de Repositório

#### LivroAsyncRepositorio.ts

```typescript
// Importação de fs/promises para operações assíncronas
import fs from 'fs/promises';

// Métodos assíncronos
private async acessarDB(): Promise<DBSchema> {
    const db = await fs.readFile(this.dbPath, 'utf8');
    return JSON.parse(db);
}

private async salvarDB(db: DBSchema): Promise<boolean> {
    try {
        await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2));
        return true;
    } catch (error) {
        console.error('Erro ao salvar o banco de dados:', error);
        return false;
    }
}
```

#### LivroAsyncMongoRepositorio.ts

```typescript
// Conexão assíncrona com MongoDB
private async getCollectionAndCLient(): Promise<{ collection: Collection<LivroSchema>; client: MongoClient }> {
    const client = new MongoClient(this.uri, {
        serverApi: { version: ServerApiVersion.v1 }
    });

    try {
        await client.connect();
        const db = client.db(this.dbName);
        const collection = db.collection<LivroSchema>(this.collectionName);
        return { collection, client };
    } catch (error) {
        await client.close();
        throw error;
    }
}
```

### 2. Camada de Serviço

#### LivrosAsyncService.ts

```typescript
// Injeção de dependência com interface assíncrona
constructor(@inject('LivroAsyncRepositorio') livroRepositorio: LivroAsyncRepositorioInterface) {
    this.livroRepositorio = livroRepositorio;
}

// Métodos assíncronos com tratamento de erro
public async getLivroPorId(id: number): Promise<ViewLivroDTO> {
    const livro = await this.livroRepositorio.getLivroPorId(id);
    if (!livro) {
        throw new NotFoundError('Livro não encontrado');
    }
    return { ...livro };
}
```

### 3. Camada de Controller

#### LivrosAsyncController.ts

```typescript
// Todos os métodos de rota são assíncronos
public async listarLivros(req: Request, res: Response, next: NextFunction) {
    try {
        const livros = await this.livrosService.listarLivros();
        res.json(livros);
    } catch (error) {
        next(error);
    }
}
```

## ⚖️ Comparação Síncrono vs Assíncrono

### Operação de Listagem

**Síncrono:**

```typescript
public listarLivros(): LivroSchema[] {
    const db = this.acessarDB();  // Bloqueia a thread
    return db.livros;
}
```

**Assíncrono:**

```typescript
public async listarLivros(): Promise<LivroSchema[]> {
    const db = await this.acessarDB();  // Não bloqueia a thread
    return db.livros;
}
```

### Operação de Criação

**Síncrono:**

```typescript
public criarLivro(livro: Livro): LivroSchema[] {
    const livros = this.listarLivros();
    livros.push({ ...livro, _id: new ObjectId() });
    const dbUpdated = this.acessarDB();
    dbUpdated.livros = livros;
    this.salvarDB(dbUpdated);
    return livros;
}
```

**Assíncrono:**

```typescript
public async criarLivro(livro: Livro): Promise<LivroSchema> {
    const livros = await this.listarLivros();
    const novoLivro: LivroSchema = { ...livro, _id: new ObjectId() };
    livros.push(novoLivro);
    const dbUpdated = await this.acessarDB();
    dbUpdated.livros = livros;
    await this.salvarDB(dbUpdated);
    return novoLivro;
}
```

## 💡 Exemplos Práticos

### 1. Tratamento de Erros

**Síncrono:**

```typescript
public getLivroPorId(id: number): ViewLivroDTO {
    const livro = this.livroRepositorio.getLivroPorId(id);
    if (!livro) {
        throw new NotFoundError('Livro não encontrado');
    }
    return { ...livro };
}
```

**Assíncrono:**

```typescript
public async getLivroPorId(id: number): Promise<ViewLivroDTO> {
    const livro = await this.livroRepositorio.getLivroPorId(id);
    if (!livro) {
        throw new NotFoundError('Livro não encontrado');
    }
    return { ...livro };
}
```

### 2. Operações de Arquivo

**Síncrono:**

```typescript
private acessarDB(): DBSchema {
    const db = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(db);
}
```

**Assíncrono:**

```typescript
private async acessarDB(): Promise<DBSchema> {
    const db = await fs.readFile(this.dbPath, 'utf8');
    return JSON.parse(db);
}
```

### 3. Conexão com Banco de Dados

**MongoDB Assíncrono:**

```typescript
public async listarLivros(): Promise<LivroSchema[]> {
    const { collection, client } = await this.getCollectionAndCLient();
    try {
        const livros = await collection.find({}).toArray();
        return livros;
    } catch (error) {
        console.error('Erro ao listar livros:', error);
        throw error;
    } finally {
        await client.close();
    }
}
```

## 🚀 Benefícios da Implementação Assíncrona

### 1. **Performance**

-   **Não-bloqueante**: Operações I/O não bloqueiam a thread principal
-   **Concorrência**: Múltiplas operações podem ser executadas simultaneamente
-   **Escalabilidade**: Melhor utilização de recursos do servidor

### 2. **Experiência do Usuário**

-   **Responsividade**: Interface permanece responsiva durante operações longas
-   **Throughput**: Maior número de requisições processadas por segundo
-   **Latência**: Redução do tempo de resposta para operações I/O

### 3. **Manutenibilidade**

-   **Código limpo**: async/await é mais legível que callbacks
-   **Tratamento de erro**: try/catch funciona naturalmente
-   **Debugging**: Stack traces mais claros e úteis

### 4. **Compatibilidade**

-   **APIs modernas**: Integração com APIs assíncronas nativas
-   **Futuro**: Preparado para evoluções do JavaScript/TypeScript
-   **Padrões**: Segue padrões modernos de desenvolvimento

## ⚡ Considerações de Performance

### Vantagens

-   **I/O não-bloqueante**: Melhor para operações de arquivo e banco de dados
-   **Concorrência**: Múltiplas requisições simultâneas
-   **Memória**: Uso mais eficiente de recursos

### Cuidados

-   **Overhead**: Pequeno overhead para operações muito simples
-   **Complexidade**: Código pode ser mais complexo para iniciantes
-   **Debugging**: Pode ser mais difícil debugar operações assíncronas

### Quando Usar

-   ✅ **Operações I/O**: Arquivos, banco de dados, APIs externas
-   ✅ **Operações longas**: Processamento que demora mais que alguns milissegundos
-   ✅ **Múltiplas operações**: Quando precisa executar várias operações em paralelo
-   ❌ **Operações simples**: Cálculos matemáticos simples, manipulação de strings

## 🔄 Padrões de Uso

### 1. **Sequencial** (quando uma operação depende da outra)

```typescript
const livros = await this.listarLivros();
const novoLivro = await this.criarLivro(dados);
const resultado = await this.atualizarEstatisticas();
```

### 2. **Paralelo** (quando operações são independentes)

```typescript
const [livros, estatisticas, configuracoes] = await Promise.all([this.listarLivros(), this.obterEstatisticas(), this.carregarConfiguracoes()]);
```

### 3. **Tratamento de Erro Robusto**

```typescript
try {
    const resultado = await operacaoAssincrona();
    return resultado;
} catch (error) {
    console.error('Erro na operação:', error);
    throw new CustomError('Falha na operação assíncrona');
} finally {
    await limpeza();
}
```

## 📚 Recursos Adicionais

-   [MDN - async/await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
-   [TypeScript - async/await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#async-functions)
-   [Node.js - fs/promises](https://nodejs.org/api/fs.html#fs_fs_promises_api)
-   [MongoDB - Async Operations](https://docs.mongodb.com/drivers/node/current/fundamentals/promises/)

---

**Nota**: Esta implementação serve como exemplo educacional para demonstrar a migração de código síncrono para assíncrono, mostrando as diferenças práticas e benefícios de cada abordagem.

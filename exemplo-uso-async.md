# Exemplo de Uso das Implementações Assíncronas

Este arquivo demonstra como usar as diferentes implementações assíncronas criadas no projeto.

## 🔄 Como Trocar entre Implementações

### 1. **Usando FileSystem Assíncrono**

Para usar o repositório assíncrono com FileSystem, você pode criar rotas específicas:

```typescript
// Em routes.ts
import { LivrosAsyncController } from '../types';

// Rota para FileSystem assíncrono
const livrosAsyncController = container.get<LivrosAsyncController>('LivrosAsyncController');
routes.use('/livros-async', Auth.init(), livrosAsyncController.router);
```

### 2. **Usando MongoDB Assíncrono**

Para usar o repositório assíncrono com MongoDB:

```typescript
// Em routes.ts
import { LivrosAsyncMongoController } from '../types';

// Rota para MongoDB assíncrono
const livrosAsyncMongoController = container.get<LivrosAsyncMongoController>('LivrosAsyncMongoController');
routes.use('/livros-mongo', Auth.init(), livrosAsyncMongoController.router);
```

## 🚀 Exemplo de Rotas Completas

### Atualizando `routes.ts` para incluir todas as implementações:

```typescript
import { Router } from 'express';
import container from './config/InversifyConfig';
import { Auth, LivrosController, LivrosAsyncController, LivrosAsyncMongoController } from '../types';

class Routes {
    private static implementacao() {
        const routes = Router();

        // Controller síncrono (original)
        const livrosController = container.get<LivrosController>('LivrosController');

        // Controller assíncrono para FileSystem
        const livrosAsyncController = container.get<LivrosAsyncController>('LivrosAsyncController');

        // Controller assíncrono para MongoDB
        const livrosAsyncMongoController = container.get<LivrosAsyncMongoController>('LivrosAsyncMongoController');

        // Rotas síncronas (originais)
        routes.use('/livros', Auth.init(), livrosController.router);

        // Rotas assíncronas para FileSystem
        routes.use('/livros-async', Auth.init(), livrosAsyncController.router);

        // Rotas assíncronas para MongoDB
        routes.use('/livros-mongo', Auth.init(), livrosAsyncMongoController.router);

        return routes;
    }

    static init() {
        return this.implementacao();
    }
}

export default Routes;
```

## 📡 Endpoints Disponíveis

Após a atualização, você terá os seguintes endpoints:

### **Síncronos (originais):**

-   `GET /api/livros` - Lista livros (síncrono)
-   `GET /api/livros/:id` - Busca livro por ID (síncrono)
-   `POST /api/livros` - Cria livro (síncrono)
-   `PATCH /api/livros/:id` - Atualiza livro (síncrono)
-   `DELETE /api/livros/:id` - Deleta livro (síncrono)

### **Assíncronos FileSystem:**

-   `GET /api/livros-async` - Lista livros (assíncrono FileSystem)
-   `GET /api/livros-async/:id` - Busca livro por ID (assíncrono FileSystem)
-   `POST /api/livros-async` - Cria livro (assíncrono FileSystem)
-   `PATCH /api/livros-async/:id` - Atualiza livro (assíncrono FileSystem)
-   `DELETE /api/livros-async/:id` - Deleta livro (assíncrono FileSystem)

### **Assíncronos MongoDB:**

-   `GET /api/livros-mongo` - Lista livros (assíncrono MongoDB)
-   `GET /api/livros-mongo/:id` - Busca livro por ID (assíncrono MongoDB)
-   `POST /api/livros-mongo` - Cria livro (assíncrono MongoDB)
-   `PATCH /api/livros-mongo/:id` - Atualiza livro (assíncrono MongoDB)
-   `DELETE /api/livros-mongo/:id` - Deleta livro (assíncrono MongoDB)

## 🧪 Testando as Implementações

### **Teste FileSystem Assíncrono:**

```bash
# Listar livros
curl -H "x-api-key: infnet-2025-secret-key" http://localhost:3000/api/livros-async

# Criar livro
curl -X POST http://localhost:3000/api/livros-async \
  -H "x-api-key: infnet-2025-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Livro Assíncrono","autor":"Autor Teste","ano":2024}'
```

### **Teste MongoDB Assíncrono:**

```bash
# Listar livros (requer configuração do MongoDB)
curl -H "x-api-key: infnet-2025-secret-key" http://localhost:3000/api/livros-mongo

# Criar livro
curl -X POST http://localhost:3000/api/livros-mongo \
  -H "x-api-key: infnet-2025-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Livro MongoDB","autor":"Autor MongoDB","ano":2024}'
```

## ⚙️ Configuração do MongoDB

Para usar o MongoDB assíncrono, configure as variáveis de ambiente no `.env`:

```bash
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=livros_db
MONGO_COLLECTION_NAME=livros
```

## 🎯 Vantagens de Cada Implementação

### **Síncrono (Original):**

-   ✅ Simples e direto
-   ✅ Fácil de entender
-   ❌ Bloqueia a thread durante I/O

### **Assíncrono FileSystem:**

-   ✅ Não bloqueia a thread
-   ✅ Melhor performance para I/O
-   ✅ Usa arquivo JSON local
-   ✅ Não requer banco de dados externo

### **Assíncrono MongoDB:**

-   ✅ Não bloqueia a thread
-   ✅ Melhor performance para I/O
-   ✅ Banco de dados robusto
-   ✅ Escalável para produção
-   ❌ Requer configuração do MongoDB

## 🔧 Próximos Passos

1. **Teste as implementações** usando os endpoints acima
2. **Compare a performance** entre síncrono e assíncrono
3. **Configure o MongoDB** se quiser testar a implementação MongoDB
4. **Escolha a implementação** que melhor se adequa ao seu caso de uso

---

**Nota**: Todas as implementações estão prontas e funcionais. O Inversify está configurado para injetar automaticamente as dependências corretas em cada controller.

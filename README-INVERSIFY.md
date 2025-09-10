# 🔄 Inversify - Injeção de Dependência

Este documento explica como o **Inversify** está implementado no projeto e como funciona a injeção de dependência.

## 📋 Índice

-   [O que é Inversify?](#o-que-é-inversify)
-   [Configuração do Container](#configuração-do-container)
-   [Decoradores](#decoradores)
-   [Bindings](#bindings)
-   [Como Funciona](#como-funciona)
-   [Vantagens](#vantagens)
-   [Exemplos Práticos](#exemplos-práticos)

## 🤔 O que é Inversify?

O **Inversify** é um container de injeção de dependência para TypeScript/JavaScript. Ele permite:

-   **Injeção automática** de dependências
-   **Gerenciamento de ciclo de vida** das instâncias
-   **Desacoplamento** entre classes
-   **Facilita testes** com mocks
-   **Melhora manutenibilidade** do código

## ⚙️ Configuração do Container

### Arquivo: `src/4webApi/config/InversifyConfig.ts`

```typescript
import { Container } from 'inversify';
import { LivroRepositorioInterface } from '../../2domain/interfaces/LivroRepositorioInterface';
import LivroRepositorio from '../../3infra/repositorios/LivroRepositorio';
import LivrosController from '../controllers/LivrosController';
import { LivrosServiceInterface } from '../../2domain/interfaces/LivrosServiceInterface';
import LivrosService from '../../2domain/services/LivrosService';

const container = new Container();

// Bindings das dependências
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorio);

container.bind<LivrosServiceInterface>('LivrosService').to(LivrosService);

container.bind<LivrosController>('LivrosController').to(LivrosController);

export default container;
```

## 🏷️ Decoradores

### `@injectable()`

Marca uma classe como injetável no container:

```typescript
@injectable()
export default class LivroRepositorio implements LivroRepositorioInterface {
    // implementação
}
```

### `@inject('Token')`

Especifica qual dependência injetar:

```typescript
@injectable()
export default class LivrosService implements LivrosServiceInterface {
    constructor(@inject('LivroRepositorio') private livroRepositorio: LivroRepositorioInterface) {
        // Inversify injeta automaticamente a instância
    }
}
```

## 🔗 Bindings

### Tipos de Binding

1. **`.to(Classe)`** - Mapeia para uma classe concreta
2. **`.toSelf()`** - Mapeia para a própria classe
3. **`.toConstantValue(valor)`** - Mapeia para um valor constante
4. **`.toFactory(factory)`** - Mapeia para uma factory function

### Exemplo de Binding

```typescript
container
    .bind<LivroRepositorioInterface>('LivroRepositorio') // Token
    .to(LivroRepositorio); // Implementação
```

## 🔄 Como Funciona

### 1. **Registro no Container**

```typescript
// Registra a interface com sua implementação
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorio);
```

### 2. **Injeção Automática**

```typescript
// O Inversify resolve automaticamente as dependências
const livrosController = container.get<LivrosController>('LivrosController');
```

### 3. **Resolução de Dependências**

```typescript
// Quando o container cria LivrosController:
// 1. Vê que precisa de LivrosService
// 2. Cria LivrosService
// 3. Vê que LivrosService precisa de LivroRepositorio
// 4. Cria LivroRepositorio
// 5. Injeta LivroRepositorio em LivrosService
// 6. Injeta LivrosService em LivrosController
```

## ✅ Vantagens

### **Antes (Sem Inversify):**

```typescript
// Instanciação manual e acoplada
const livroRepositorio = new LivroRepositorio();
const livrosService = new LivrosService(livroRepositorio);
const livrosController = new LivrosController(livrosService);
```

### **Depois (Com Inversify):**

```typescript
// Injeção automática e desacoplada
const livrosController = container.get<LivrosController>('LivrosController');
```

## 🧪 Exemplos Práticos

### **1. Teste com Mock**

```typescript
// Em testes, você pode facilmente mockar dependências
const mockRepositorio = {
    listarLivros: jest.fn(),
    buscarLivroPorId: jest.fn(),
    // ... outros métodos
};

container.bind<LivroRepositorioInterface>('LivroRepositorio').toConstantValue(mockRepositorio);
```

### **2. Diferentes Implementações**

```typescript
// Para desenvolvimento
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorioFake);

// Para produção
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorioReal);
```

### **3. Singleton vs Transient**

```typescript
// Singleton (mesma instância sempre)
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorio).inSingletonScope();

// Transient (nova instância sempre)
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorio).inTransientScope();
```

## 🚀 Uso no Projeto

### **1. Import do Container**

```typescript
import container from './config/InversifyConfig';
```

### **2. Obtenção de Instâncias**

```typescript
// Em routes.ts
const livrosController = container.get<LivrosController>('LivrosController');
```

### **3. Resolução Automática**

```typescript
// O Inversify resolve automaticamente:
// LivrosController → LivrosService → LivroRepositorio
```

## 🔧 Configuração Adicional

### **1. Reflect Metadata**

```typescript
// main.ts - Deve ser importado primeiro
import 'reflect-metadata';
```

### **2. Configuração TypeScript**

```json
// tsconfig.json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## 📚 Recursos Adicionais

-   [Documentação Oficial Inversify](https://inversify.io/)
-   [Guia de Injeção de Dependência](https://inversify.io/advanced/injection)
-   [Padrões de Design](https://inversify.io/advanced/scope)

## 🎯 Resumo

O **Inversify** transforma seu código de:

```typescript
// ❌ Acoplado e manual
const repo = new LivroRepositorio();
const service = new LivrosService(repo);
const controller = new LivrosController(service);
```

Para:

```typescript
// ✅ Desacoplado e automático
const controller = container.get<LivrosController>('LivrosController');
```

**Resultado:** Código mais limpo, testável e manutenível! 🎉

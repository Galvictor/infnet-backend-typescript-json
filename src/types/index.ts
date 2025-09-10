// Entidades
export { Livro } from '../1entidades/Livro';

// DTOs
export type { CriarLivroDTO, ViewLivroDTO, AtualizarLivroDTO } from '../2domain/dtos/LivroDTO';

// Schemas
export type { LivroSchema } from '../3infra/repositorios/LivroSchema';
export type { DBSchema } from '../3infra/repositorios/DBSchema';

// Interfaces
export type { LivroRepositorioInterface } from '../2domain/interfaces/LivroRepositorioInterface';
export type { LivrosServiceInterface } from '../2domain/interfaces/LivrosServiceInterface';

// Exceções
export { default as CustomError } from '../2domain/exceptions/CustomErros';
export { NotFoundError } from '../2domain/exceptions/NotFoundError';

// Serviços
export { default as LivrosService } from '../2domain/services/LivrosService';

// Repositórios
export { default as LivroRepositorio } from '../3infra/repositorios/LivroRepositorio';

// Controllers
export { default as LivrosController } from '../4webApi/controllers/LivrosController';

// Middlewares
export { default as Auth } from '../3infra/middlewares/Auth';
export { default as ErrorHandler } from '../3infra/middlewares/ErrorHandler';
export { default as Logger } from '../3infra/middlewares/Logger';

// Container
export { default as container } from '../4webApi/config/InversifyConfig';

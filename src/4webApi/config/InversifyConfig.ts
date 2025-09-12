import { Container } from 'inversify';
import { LivroRepositorioInterface } from '../../2domain/interfaces/LivroRepositorioInterface';
import { LivroAsyncRepositorioInterface } from '../../2domain/interfaces/LivroAsyncRepositorioInterface';
import LivroRepositorio from '../../3infra/repositorios/LivroRepositorio';
import LivroAsyncRepositorio from '../../3infra/repositorios/LivroAsyncRepositorio';
import LivroAsyncMongoRepositorio from '../../3infra/repositorios/LivroAsyncMongoRepositorio';
import LivrosController from '../controllers/LivrosController';
import LivrosAsyncController from '../controllers/LivrosAsyncController';
import LivrosAsyncMongoController from '../controllers/LivrosAsyncMongoController';
import { LivrosServiceInterface } from '../../2domain/interfaces/LivrosServiceInterface';
import { LivrosAsyncServiceInterface } from '../../2domain/interfaces/LivrosAsyncServiceInterface';
import LivrosService from '../../2domain/services/LivrosService';
import LivrosAsyncService from '../../2domain/services/LivrosAsyncService';
import LivrosAsyncMongoService from '../../2domain/services/LivrosAsyncMongoService';

const container = new Container();

// Bindings síncronos (originais)
container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorio).inRequestScope();
container.bind<LivrosServiceInterface>('LivrosService').to(LivrosService).inRequestScope();
container.bind<LivrosController>('LivrosController').to(LivrosController).inRequestScope();

// Bindings assíncronos para FileSystem
container.bind<LivroAsyncRepositorioInterface>('LivroAsyncRepositorio').to(LivroAsyncRepositorio).inRequestScope();
container.bind<LivrosAsyncServiceInterface>('LivrosAsyncService').to(LivrosAsyncService).inRequestScope();
container.bind<LivrosAsyncController>('LivrosAsyncController').to(LivrosAsyncController).inRequestScope();

// Bindings assíncronos para MongoDB
container.bind<LivroAsyncRepositorioInterface>('LivroAsyncMongoRepositorio').to(LivroAsyncMongoRepositorio).inRequestScope();
container.bind<LivrosAsyncServiceInterface>('LivrosAsyncMongoService').to(LivrosAsyncMongoService).inRequestScope();
container.bind<LivrosAsyncMongoController>('LivrosAsyncMongoController').to(LivrosAsyncMongoController).inRequestScope();

export default container;

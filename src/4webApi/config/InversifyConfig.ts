import { Container } from 'inversify';
import { LivroRepositorioInterface } from '../../2domain/interfaces/LivroRepositorioInterface';
import LivroRepositorio from '../../3infra/repositorios/LivroRepositorio';
import LivrosController from '../controllers/LivrosController';
import { LivrosServiceInterface } from '../../2domain/interfaces/LivrosServiceInterface';
import LivrosService from '../../2domain/services/LivrosService';

const container = new Container();

container.bind<LivroRepositorioInterface>('LivroRepositorio').to(LivroRepositorio);

container.bind<LivrosServiceInterface>('LivrosService').to(LivrosService);

container.bind<LivrosController>('LivrosController').to(LivrosController);

export default container;

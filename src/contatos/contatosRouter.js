import { Router } from 'express';
import {
    cadastrarContato,
    listarContatos,
    buscarContato,
    atualizarContato,
    excluirContato,
} from './contatosController.js';
import { autenticar } from '../auth/authMiddleware.js';

const router = Router();

router.get('/', autenticar, listarContatos);

router.get('/:id', autenticar, buscarContato);

router.post('/', autenticar, cadastrarContato);

router.put('/:id', autenticar, atualizarContato);

router.delete('/:id', excluirContato);

export default router;

import { Router } from 'express';
import {
    cadastrarContato,
    listarContatos,
    buscarContato,
    atualizarContato,
    excluirContato,
} from './contatosController.js';

const router = Router();

router.post('/', cadastrarContato);

router.get('/', listarContatos);

router.get('/:id', buscarContato);

router.put('/:id', atualizarContato);

router.delete('/:id', excluirContato);

export default router;

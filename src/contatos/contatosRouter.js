import { Router } from 'express';
import {
    cadastrarContato,
    listarContatos,
    buscarContato,
    atualizarContato,
    excluirContato,
} from './contatosController.js';

const router = Router();

// POST   /contatos        → cria um novo contato
router.post('/', cadastrarContato);

// GET    /contatos        → lista todos os contatos
router.get('/', listarContatos);

// GET    /contatos/:id    → retorna um contato específico
router.get('/:id', buscarContato);

// PUT    /contatos/:id    → atualiza um contato existente
router.put('/:id', atualizarContato);

// DELETE /contatos/:id   → remove um contato
router.delete('/:id', excluirContato);

export default router;

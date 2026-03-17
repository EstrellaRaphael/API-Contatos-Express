import { Router } from 'express';
import contatosRouter from './contatos/contatosRouter.js';

const router = Router();

// Todas as rotas que começam com /contatos são delegadas ao contatosRouter.
// Isso significa que dentro do contatosRouter as rotas são relativas:
//   '/'    → /contatos
//   '/:id' → /contatos/:id
router.use('/contatos', contatosRouter);

export default router;

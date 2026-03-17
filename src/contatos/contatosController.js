// Array que simula um banco de dados em memória.
// Cada contato vai ser um objeto { id, nome, telefone, email }.
// Os dados existem enquanto o servidor estiver rodando.
const contatos = [];

// Contador simples para gerar IDs únicos e crescentes (1, 2, 3...).
// Num banco de dados real, o próprio banco geraria esse ID automaticamente.
let proximoId = 1;

// ─── CADASTRAR ────────────────────────────────────────────────────────────────
// Recebe os dados do corpo (body) da requisição e cria um novo contato.
export function cadastrarContato(req, res) {
    const { nome, telefone, email } = req.body;

    // Regra de negócio: o contato precisa ter nome e pelo menos uma forma de contato.
    // Sem isso, a requisição é rejeitada com status 400 (Bad Request).
    if (!nome) {
        return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
    }

    if (!telefone && !email) {
        return res.status(400).json({ erro: 'Informe ao menos um telefone ou email.' });
    }

    // Monta o objeto do contato com um ID gerado automaticamente.
    const novoContato = { id: proximoId++, nome, telefone, email };

    // Adiciona ao array (equivale a um INSERT no banco).
    contatos.push(novoContato);

    // Responde com status 201 (Created) e o contato recém-criado.
    res.status(201).json(novoContato);
}

// ─── LISTAR TODOS ─────────────────────────────────────────────────────────────
// Devolve todos os contatos cadastrados.
export function listarContatos(req, res) {
    res.json(contatos);
}

// ─── BUSCAR UM ────────────────────────────────────────────────────────────────
// Busca um contato pelo ID que vem na URL (ex: /contatos/2).
export function buscarContato(req, res) {
    // req.params.id chega como string; Number() converte para número.
    const id = Number(req.params.id);

    const contato = contatos.find(c => c.id === id);

    // Se não encontrou, responde 404 (Not Found).
    if (!contato) {
        return res.status(404).json({ erro: 'Contato não encontrado.' });
    }

    res.json(contato);
}

// ─── ATUALIZAR ────────────────────────────────────────────────────────────────
// Substitui os dados de um contato existente com os novos dados do body.
export function atualizarContato(req, res) {
    const id = Number(req.params.id);
    const indice = contatos.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Contato não encontrado.' });
    }

    const { nome, telefone, email } = req.body;

    // Mesma validação do cadastro: nome e pelo menos uma forma de contato.
    if (!nome) {
        return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
    }

    if (!telefone && !email) {
        return res.status(400).json({ erro: 'Informe ao menos um telefone ou email.' });
    }

    // Mantém o ID original e atualiza os demais campos.
    contatos[indice] = { id, nome, telefone, email };

    res.json(contatos[indice]);
}

// ─── EXCLUIR ──────────────────────────────────────────────────────────────────
// Remove o contato do array pelo ID.
export function excluirContato(req, res) {
    const id = Number(req.params.id);
    const indice = contatos.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Contato não encontrado.' });
    }

    // splice(indice, 1) remove exatamente 1 elemento na posição encontrada.
    contatos.splice(indice, 1);

    // 204 (No Content): operação bem-sucedida, sem corpo na resposta.
    res.status(204).send();
}
